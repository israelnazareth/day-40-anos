import { Button } from "@/components/ui/button";
import { EVENT } from "@/config/event";
import Day from "@/public/day.webp";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../commons/Reveal";

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-10 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 20%, rgba(220,220,220,0.15), transparent 70%), radial-gradient(50% 50% at 50% 100%, rgba(220,220,220,0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <Reveal delay={0.1}>
          <p className="text-silver-dim mb-4 text-xs uppercase tracking-[0.25em]">
            Convite especial • 02 . 10 . 2026
          </p>

          <h1 className="font-display text-5xl font-semibold sm:text-6xl">
            <span className="text-silver-gradient">{EVENT.honoree}</span>
          </h1>

          <Image
            src={Day}
            alt="Day"
            className="mt-6 rounded-2xl m-auto w-full max-w-xs"
            loading="eager"
          />

          <div className="mb-6 flex justify-between items-center">
            <div className="divider-silver w-16 mt-12" />

            <span className="text-silver-gradient font-display text-[7rem] leading-none font-bold sm:text-[9rem]">
              {EVENT.age}
            </span>

            <div className="divider-silver w-16 mt-12" />
          </div>

          <p
            className="font-display text-lg italic text-muted-foreground"
            suppressHydrationWarning
          >
            quarenta anos
          </p>

          <div className="mt-10 space-y-1 text-sm uppercase tracking-[0.3em] text-silver">
            <div>{EVENT.dateLabel}</div>
            <div>·</div>
            <div>{EVENT.timeLabel}</div>
          </div>

          <div className="mt-12 m-auto">
            <Button variant="outline">
              <Link href="/presentes">Lista de presentes</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
