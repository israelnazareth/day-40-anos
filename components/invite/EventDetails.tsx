import { EVENT } from "@/config/event";
import { Calendar, Clock, Shirt } from "lucide-react";

export function EventDetails() {
  const items = [
    { icon: Calendar, label: "Data", value: EVENT.dateLabel },
    { icon: Clock, label: "Horário", value: EVENT.timeLabel },
    { icon: Shirt, label: "Traje", value: EVENT.dressCode },
  ];

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-md">
        <div className="divider-silver mb-10" />
        <h2 className="text-silver-gradient text-center font-display text-3xl">
          Detalhes
        </h2>
        <div className="mt-8 grid gap-3">
          {items.map((it) => (
            <div
              key={it.label}
              className="flex items-center gap-4 rounded-md border border-silver bg-card/40 px-4 py-3"
            >
              <it.icon className="h-5 w-5 text-silver" strokeWidth={1.5} />
              <div>
                <div className="text-silver-dim text-[0.65rem] uppercase tracking-widest">
                  {it.label}
                </div>
                <div className="text-foreground">{it.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
