import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  buildCallbackAttribution,
  buildDealerDemoFollowUpContext,
  buildDealerDemoOpeningLine,
  buildDealerLead,
  resolveSalesDemoProfile,
  type SalesDemoProfileId,
} from "@/lib/live-callback-model";
import { getRecentCallbackForPhone, setLiveCallbackRecord, withRecalculatedIntent } from "./state";

const CALLBACK_COOLDOWN_MS = 90_000;

function envValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function getAgentId(profileId: SalesDemoProfileId): string | undefined {
  const profileEnvMap: Record<SalesDemoProfileId, string | undefined> = {
    inbound_qualifier:
      envValue(process.env.ELEVENLABS_AGENT_ID_INBOUND_QUALIFIER) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_PRIME) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_SHARED),
    outbound_reactivation:
      envValue(process.env.ELEVENLABS_AGENT_ID_OUTBOUND_REACTIVATION) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_NEAR_PRIME) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_SHARED),
    appointment_rescue:
      envValue(process.env.ELEVENLABS_AGENT_ID_APPOINTMENT_RESCUE) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_NEAR_PRIME) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_SHARED),
    trade_in:
      envValue(process.env.ELEVENLABS_AGENT_ID_TRADE_IN) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_PRIME) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_SHARED),
    finance_handoff:
      envValue(process.env.ELEVENLABS_AGENT_ID_FINANCE_HANDOFF) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_FIRST_TIME_SUBPRIME) ??
      envValue(process.env.ELEVENLABS_AGENT_ID_SHARED),
  };
  return profileEnvMap[profileId];
}

function getVoiceId(profileId: SalesDemoProfileId): string | undefined {
  const profileVoiceMap: Record<SalesDemoProfileId, string | undefined> = {
    inbound_qualifier:
      envValue(process.env.ELEVENLABS_VOICE_ID_MAYA) ??
      envValue(process.env.ELEVENLABS_VOICE_ID_SHARED),
    outbound_reactivation:
      envValue(process.env.ELEVENLABS_VOICE_ID_MAYA) ??
      envValue(process.env.ELEVENLABS_VOICE_ID_SHARED),
    appointment_rescue:
      envValue(process.env.ELEVENLABS_VOICE_ID_AVERY) ??
      envValue(process.env.ELEVENLABS_VOICE_ID_SHARED),
    trade_in:
      envValue(process.env.ELEVENLABS_VOICE_ID_ERIC) ??
      envValue(process.env.ELEVENLABS_VOICE_ID_SHARED),
    finance_handoff:
      envValue(process.env.ELEVENLABS_VOICE_ID_ERIC) ??
      envValue(process.env.ELEVENLABS_VOICE_ID_SHARED),
  };
  return profileVoiceMap[profileId];
}

function firstNameFromContact(contactName: string, fallback: string): string {
  return contactName.split(/\s+/)[0]?.replace(/[^A-Za-z'-]/g, "") || fallback;
}

function addOptionalDynamicVariable(
  dynamicVariables: Record<string, string>,
  key: string,
  value: string | null | undefined,
) {
  if (value) dynamicVariables[key] = value;
}

function isPublicLiveCallbackEnabled(): boolean {
  return process.env.LIVE_CALLBACK_PUBLIC_ENABLED === "true";
}

export async function POST(req: NextRequest) {
  if (!isPublicLiveCallbackEnabled()) {
    return NextResponse.json(
      {
        error:
          "Public live callbacks are disabled. Request a guided demo at audienceactivator.ai instead.",
      },
      { status: 410 },
    );
  }

  try {
    const body = (await req.json()) as {
      profileId?: string;
      profileType?: string;
      phoneNumber?: string;
      contactName?: string;
      dealershipName?: string;
      dealerEmail?: string;
      problemToSolve?: string;
      interestContext?: string;
      attribution?: unknown;
    };

    const profile = resolveSalesDemoProfile((body.profileId ?? body.profileType ?? "").trim());
    if (!profile) {
      return NextResponse.json(
        { error: "Choose an AI sales agent before requesting the callback." },
        { status: 400 },
      );
    }

    const leadResult = buildDealerLead({
      contactName: body.contactName,
      dealershipName: body.dealershipName,
      dealerEmail: body.dealerEmail,
      phoneNumber: body.phoneNumber,
      problemToSolve: body.problemToSolve,
      interestContext: body.interestContext,
    });
    if ("error" in leadResult) {
      return NextResponse.json({ error: leadResult.error }, { status: 400 });
    }

    const lead = leadResult.lead;
    const attribution = buildCallbackAttribution(body.attribution);
    const recentCallback = getRecentCallbackForPhone(lead.phoneNumber, CALLBACK_COOLDOWN_MS);
    if (recentCallback) {
      return NextResponse.json(
        {
          error:
            "A callback was just requested for this number. Please wait a moment before trying again.",
        },
        { status: 429 },
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const agentId = getAgentId(profile.id);
    const voiceId = getVoiceId(profile.id);
    const agentPhoneNumberId =
      process.env.ELEVENLABS_AGENT_PHONE_NUMBER_ID ??
      process.env.ELEVENLABS_AGENT_PHONE_NUMBER_ID_SHARED;

    if (!apiKey || !agentId || !agentPhoneNumberId) {
      return NextResponse.json(
        {
          error: "Callback flow is not configured yet.",
          details:
            "Set ELEVENLABS_API_KEY, profile agent IDs or ELEVENLABS_AGENT_ID_SHARED, and ELEVENLABS_AGENT_PHONE_NUMBER_ID.",
        },
        { status: 503 },
      );
    }

    const resolvedFirstName = firstNameFromContact(lead.contactName, profile.defaultFirstName);
    const dynamicVariables: Record<string, string> = {
      source: "audienceactivator_callback_flow",
      selected_profile: profile.id,
      selected_profile_label: profile.label,
      profile_outcome: profile.outcome,
      dealer_contact_name: lead.contactName,
      dealer_first_name: resolvedFirstName,
      dealership_name: lead.dealershipName,
      dealer_email: lead.dealerEmail,
      callback_phone_number: lead.phoneNumber,
      callback_opt_in_confirmed: "true",
      contact_info_confirmed: "true",
      outreach_context:
        "Dealer prospect requested this live AI callback from the Audience Activator AI BDC Copilot page and confirmed their contact details.",
      callback_origin: "website_live_demo_request",
      callback_origin_phrase:
        "You requested this live AI sales demo from the Audience Activator AI website.",
      tone_mode: "professional_dealer_demo",
      opening_style: "short_permission_check",
      must_acknowledge_callback_email: "true",
      must_use_exact_interest_context: "true",
      do_not_substitute_vehicle: "true",
      must_acknowledge_interest_context_in_first_turn: "false",
      must_identify_as_ai_demo: "true",
      voice_delivery_guidance:
        "Use a calm phone pace, short sentences, and clear articulation. Do not rush the opening.",
    };

    addOptionalDynamicVariable(dynamicVariables, "problem_to_solve", lead.problemToSolve);
    addOptionalDynamicVariable(dynamicVariables, "customer_interest_context", lead.interestContext);
    addOptionalDynamicVariable(dynamicVariables, "interest_context", lead.interestContext);
    addOptionalDynamicVariable(
      dynamicVariables,
      "customer_vehicle_requested_exact",
      lead.interestContext,
    );
    addOptionalDynamicVariable(dynamicVariables, "vehicle_of_interest", lead.interestContext);
    addOptionalDynamicVariable(dynamicVariables, "vehicle_interest", lead.interestContext);
    addOptionalDynamicVariable(dynamicVariables, "requested_vehicle", lead.interestContext);
    addOptionalDynamicVariable(dynamicVariables, "requested_vehicle_exact", lead.interestContext);
    addOptionalDynamicVariable(
      dynamicVariables,
      "interest_context_must_repeat_exact",
      lead.interestContext,
    );
    addOptionalDynamicVariable(dynamicVariables, "utm_source", attribution.source);
    addOptionalDynamicVariable(dynamicVariables, "utm_medium", attribution.medium);
    addOptionalDynamicVariable(dynamicVariables, "utm_campaign", attribution.campaign);
    addOptionalDynamicVariable(dynamicVariables, "utm_content", attribution.content);
    addOptionalDynamicVariable(dynamicVariables, "utm_term", attribution.term);
    addOptionalDynamicVariable(dynamicVariables, "landing_path", attribution.landingPath);

    const openingLine = buildDealerDemoOpeningLine({
      firstName: resolvedFirstName,
      callerName: profile.callerName,
    });
    const followUpContext = buildDealerDemoFollowUpContext({
      profileLabel: profile.label,
      dealershipName: lead.dealershipName,
      interestContext: lead.interestContext,
      problemToSolve: lead.problemToSolve,
    });

    dynamicVariables.opening_line = openingLine;
    dynamicVariables.opening_line_instruction =
      "Say the opening_line exactly as written. Do not mention the dealership name, selected AI agent profile, vehicle, campaign, or dealer concern until after the dealer confirms it is a good time.";
    dynamicVariables.second_turn_context = followUpContext;
    dynamicVariables.second_turn_instruction =
      "After the dealer confirms it is a good time, use second_turn_context to frame the demo in one or two short sentences before asking a helpful discovery question.";
    dynamicVariables.customer_first_name = resolvedFirstName;
    dynamicVariables.first_name = resolvedFirstName;
    if (lead.interestContext) {
      dynamicVariables.interest_context_ack_phrase = `Thanks again for requesting this callback about ${lead.interestContext}.`;
    }

    const response = await fetch("https://api.elevenlabs.io/v1/convai/twilio/outbound-call", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        agent_id: agentId,
        agent_phone_number_id: agentPhoneNumberId,
        to_number: lead.phoneNumber,
        conversation_initiation_client_data: {
          dynamic_variables: dynamicVariables,
          ...(voiceId
            ? { conversation_config_override: { tts: { voice_id: voiceId } } }
            : {}),
        },
      }),
    });

    const raw = await response.text();
    if (!response.ok) {
      return NextResponse.json(
        { error: "We could not start the callback right now. Please try again in a moment." },
        { status: 502 },
      );
    }

    const parsed = JSON.parse(raw) as {
      conversation_id?: string;
      callSid?: string;
      call_sid?: string;
    };
    const requestId = randomUUID();
    const now = new Date().toISOString();
    const callSid = parsed.callSid ?? parsed.call_sid ?? null;

    setLiveCallbackRecord(
      withRecalculatedIntent({
        requestId,
        profileType: profile.id,
        profileLabel: profile.label,
        contactName: lead.contactName,
        dealershipName: lead.dealershipName,
        dealerEmail: lead.dealerEmail,
        phoneNumber: lead.phoneNumber,
        firstName: resolvedFirstName,
        problemToSolve: lead.problemToSolve,
        interestContext: lead.interestContext,
        attribution,
        conversationId: parsed.conversation_id ?? null,
        callSid,
        stage: "queued",
        providerStatus: callSid ? "queued" : "queued_no_callsid",
        createdAt: now,
        updatedAt: now,
        lastError: null,
        intentScore: 0,
        intentSignals: [],
        recapRequestedAt: null,
        dashboardClickedAt: null,
        leadNotificationStatus: "not_configured",
        leadNotificationError: null,
      }),
    );

    return NextResponse.json({
      requestId,
      queued: true,
      profileType: profile.id,
      profileLabel: profile.label,
      dealershipName: lead.dealershipName,
      phoneNumber: lead.phoneNumber,
      conversationId: parsed.conversation_id ?? null,
      callSid,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error starting callback flow.", details: String(error) },
      { status: 500 },
    );
  }
}
