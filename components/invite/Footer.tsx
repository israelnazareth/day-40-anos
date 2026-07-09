import { EVENT } from "@/config/event";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="p-6 text-center">
      <div className="divider-silver mx-auto max-w-xs" />
      <div className="mt-8 flex flex-col items-center gap-3">
        <Heart className="h-4 w-4 text-silver" strokeWidth={1.5} />
        <p className="font-display italic text-silver">
          Com carinho, {EVENT.honoree}
        </p>
        <p className="text-silver-dim text-[0.65rem] uppercase tracking-[0.3em]">
          {EVENT.dateLabel}
        </p>
      </div>
    </footer>
  );
}
