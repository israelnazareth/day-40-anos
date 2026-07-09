"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/config/event";

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function Countdown() {
  const target = new Date(EVENT.date).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "dias", value: t.days },
    { label: "horas", value: t.hours },
    { label: "min", value: t.minutes },
    { label: "seg", value: t.seconds },
  ];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-md text-center">
        <p className="text-silver-dim mb-6 text-xs uppercase tracking-[0.4em]">
          contagem regressiva
        </p>
        <div className="grid grid-cols-4 gap-2">
          {items.map((i) => (
            <div
              key={i.label}
              className="shadow-silver-glow rounded-md border border-silver bg-card/60 px-2 py-4 backdrop-blur-sm"
            >
              <div
                className="text-silver-gradient font-display text-3xl font-semibold tabular-nums sm:text-4xl"
                suppressHydrationWarning
              >
                {String(i.value).padStart(2, "0")}
              </div>
              <div className="text-silver-dim mt-1 text-[0.65rem] uppercase tracking-widest">
                {i.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
