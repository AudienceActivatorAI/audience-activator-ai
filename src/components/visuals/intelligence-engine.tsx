import { cn } from "@/lib/utils";

const sources = ["Web", "Phone", "Chat", "Marketplace", "Trade"];
const outputs = ["Unified profile", "Next best action", "Activation"];

export function IntelligenceEngine({ className }: { className?: string }) {
  const leftX = 150;
  const srcGap = 74;
  const srcTop = 58;
  const srcY = (i: number) => srcTop + i * srcGap;
  const engineLeft = 318;
  const engineRight = 482;
  const engineMidY = srcY(2) + 12;
  const outY = [110, 222, 334];

  return (
    <svg
      viewBox="0 0 800 440"
      role="img"
      aria-label="Audience Activator Intelligence engine: signals resolved, scored, and activated"
      className={cn("h-auto w-full", className)}
      fill="none"
    >
      <defs>
        <linearGradient id="engineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F6FFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1F6FFF" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="lineFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1F6FFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1F6FFF" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Connectors: sources -> engine */}
      {sources.map((_, i) => {
        const y = srcY(i) + 17;
        return (
          <path
            key={`in-${i}`}
            d={`M ${leftX} ${y} C ${leftX + 70} ${y}, ${engineLeft - 70} ${engineMidY}, ${engineLeft} ${engineMidY}`}
            stroke="url(#lineFade)"
            strokeWidth="1.5"
            className="animate-flow"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        );
      })}

      {/* Connectors: engine -> outputs */}
      {outputs.map((_, i) => {
        const y = outY[i] + 20;
        return (
          <path
            key={`out-${i}`}
            d={`M ${engineRight} ${engineMidY} C ${engineRight + 60} ${engineMidY}, ${600 - 60} ${y}, ${600} ${y}`}
            stroke="url(#lineFade)"
            strokeWidth="1.5"
            className="animate-flow"
            style={{ animationDelay: `${0.3 + i * 0.12}s` }}
          />
        );
      })}

      {/* Source nodes */}
      {sources.map((label, i) => (
        <g key={label}>
          <rect
            x="20"
            y={srcY(i)}
            width="130"
            height="34"
            rx="9"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.12)"
          />
          <circle cx="40" cy={srcY(i) + 17} r="3" fill="#5B8DFF" />
          <text
            x="56"
            y={srcY(i) + 21}
            fill="rgba(255,255,255,0.78)"
            fontSize="12.5"
            fontFamily="var(--font-mono)"
            letterSpacing="0.04em"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Engine block */}
      <rect
        x={engineLeft}
        y="92"
        width={engineRight - engineLeft}
        height="256"
        rx="18"
        fill="url(#engineFill)"
        stroke="rgba(91,141,255,0.45)"
      />
      <text
        x={(engineLeft + engineRight) / 2}
        y="120"
        textAnchor="middle"
        fill="#8DB4FF"
        fontSize="10.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.18em"
      >
        INTELLIGENCE
      </text>
      {["Resolve identity", "Score intent", "Decide action"].map((step, i) => (
        <g key={step}>
          <rect
            x={engineLeft + 18}
            y={142 + i * 58}
            width={engineRight - engineLeft - 36}
            height="44"
            rx="10"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.14)"
          />
          <text
            x={(engineLeft + engineRight) / 2}
            y={142 + i * 58 + 27}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="13"
            fontWeight="500"
            fontFamily="var(--font-sans)"
          >
            {step}
          </text>
        </g>
      ))}

      {/* Output nodes */}
      {outputs.map((label, i) => (
        <g key={label}>
          <rect
            x="600"
            y={outY[i]}
            width="180"
            height="40"
            rx="11"
            fill="rgba(31,111,255,0.10)"
            stroke="rgba(91,141,255,0.5)"
          />
          <text
            x="690"
            y={outY[i] + 25}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="12.5"
            fontWeight="500"
            fontFamily="var(--font-sans)"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
