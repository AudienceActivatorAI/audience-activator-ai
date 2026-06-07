import { ProfileCard } from "@/components/product/profile-card";
import { productProfileCards } from "@/components/product/product-profile-cards";
import { cn } from "@/lib/utils";

export function UnifiedProfile({ className }: { className?: string }) {
  const data = productProfileCards["super-pixel"];
  return <ProfileCard data={data} className={cn(className)} />;
}
