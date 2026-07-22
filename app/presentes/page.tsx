import { getEventBySlug } from "@/lib/db/queries/events";
import { getGifts } from "@/lib/db/queries/gifts";

import { GiftsView } from "./gifts-view";

export const revalidate = 0;

export default async function GiftsPage() {
  const event = await getEventBySlug("day-40-anos");

  if (!event) return null;

  const gifts = await getGifts(event.id);

  return <GiftsView event={event} gifts={gifts} />;
}
