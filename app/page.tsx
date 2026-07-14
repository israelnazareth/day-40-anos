import { getEventBySlug } from "@/lib/db/queries/events";
import { Homepage } from "./homepage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const event = await getEventBySlug("day-40-anos");

  if (!event) return null;

  return <Homepage event={event} />;
}
