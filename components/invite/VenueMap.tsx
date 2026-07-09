import { EVENT } from "@/config/event";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function VenueMap() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-md">
        <h2 className="text-silver-gradient text-center font-display text-3xl">
          Local
        </h2>
        <div className="mt-6 rounded-lg border border-silver bg-card/40 p-4">
          <div className="flex items-start gap-3">
            <MapPin
              className="mt-1 h-5 w-5 shrink-0 text-silver"
              strokeWidth={1.5}
            />
            <div>
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
            variant="outline"
            className="mt-4 w-full border-silver bg-transparent hover:bg-accent"
          >
            <a href={EVENT.mapsLink} target="_blank" rel="noreferrer">
              Como chegar
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
