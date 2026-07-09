"use client";

import { EVENT } from "@/config/event";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "../ui/button";

export function EventDetails() {
  const items = [
    { icon: Calendar, label: "Data", value: EVENT.dateLabel },
    { icon: Clock, label: "Horário", value: EVENT.timeLabel },
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
          <div className="rounded-lg border border-silver bg-card/40 p-4">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-1 h-6.5 w-6.5 shrink-0 text-silver"
                strokeWidth={1.5}
              />
              <div>
                <div className="text-silver-dim text-[0.65rem] uppercase tracking-widest">
                  Local
                </div>
                <div className="text-foreground font-medium">
                  {EVENT.venueName}
                </div>
                <div className="text-muted-foreground text-sm">
                  {EVENT.address}
                </div>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-md border border-silver">
              <iframe
                title="Mapa do local"
                src={EVENT.mapsEmbedUrl}
                width="100%"
                height="240"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <Button
              variant="ghost"
              nativeButton={false}
              className="mt-4 w-full border-silver bg-transparent hover:bg-accent"
              render={
                <a href={EVENT.mapsLink} target="_blank" rel="noreferrer" />
              }
            >
              Como chegar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
