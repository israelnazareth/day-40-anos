import { getEventBySlug } from "@/lib/db/queries/events";
import { getGifts } from "@/lib/db/queries/gifts";

import { PresentesView } from "./gifts-view";

export default async function PresentesPage() {
  const event = await getEventBySlug("day-40-anos");

  if (!event) return null;

  const gifts = await getGifts(event.id);

  return <PresentesView event={event} gifts={gifts} />;
}
