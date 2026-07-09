import { EVENT } from "@/config/event";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 20%, rgba(220,220,220,0.15), transparent 70%), radial-gradient(50% 50% at 50% 100%, rgba(220,220,220,0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <p className="text-silver-dim mb-4 text-xs uppercase tracking-[0.4em]">
          Você está convidado
        </p>
        <h1 className="font-display text-5xl font-semibold sm:text-6xl">
          <span className="text-silver-gradient">{EVENT.honoree}</span>
        </h1>
        <div className="my-6 flex items-center gap-4">
          <div className="divider-silver w-16" />
          <span className="text-silver-gradient font-display text-[7rem] leading-none font-bold sm:text-[9rem]">
            {EVENT.age}
          </span>
          <div className="divider-silver w-16" />
        </div>
        <p
          className="font-display text-lg italic text-muted-foreground"
          suppressHydrationWarning
        >
          anos
        </p>

        <div className="mt-10 space-y-1 text-sm uppercase tracking-[0.3em] text-silver">
          <div>{EVENT.dateLabel}</div>
          <div>·</div>
          <div>{EVENT.timeLabel}</div>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="border-silver bg-transparent text-foreground hover:bg-accent"
          >
            <a href="#rsvp">Confirmar presença</a>
          </Button>
          <Button className="bg-silver-gradient text-black hover:opacity-90">
            <Link href="/presentes">Lista de presentes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
