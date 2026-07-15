import { EVENT } from "@/config/event";
import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="p-6 text-center">
      <div className="divider-silver mx-auto max-w-xs" />
      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="font-display text-muted-foreground italic flex items-center gap-1">
          <span>Desenvolvido com</span>
          <Heart
            className="w-4 h-4 ml-1 animate-heartbeat"
            color="red"
            fill="red"
          />
          <span>
            por{" "}
            <Link
              href="https://israelnazareth.com"
              className="hover:text-muted-foreground text-silver transition-colors"
              target="_blank"
            >
              Israel Nazareth
            </Link>
          </span>
        </p>
        <p className="text-silver-dim text-[0.65rem] uppercase tracking-[0.3em]">
          {EVENT.dateLabel}
        </p>
      </div>
    </footer>
  );
}
