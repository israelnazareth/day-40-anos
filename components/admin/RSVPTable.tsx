import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPhone } from "@/lib/format-phone";
import type { RSVPRecord } from "@/types/forms";

export function RSVPTable({ rsvps }: { rsvps: RSVPRecord[] }) {
  if (rsvps.length === 0) {
    return <EmptyRow message="Nenhuma confirmação recebida ainda." />;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-silver">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead className="text-right">Acomp.</TableHead>
            <TableHead>Nome(s) do(s) acompanhante(s)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rsvps.map((rsvp) => (
            <TableRow key={rsvp.id}>
              <TableCell className="font-medium">{rsvp.name}</TableCell>
              <TableCell>{formatPhone(rsvp.phone ?? "")}</TableCell>
              <TableCell className="text-right">{rsvp.companions}</TableCell>
              <TableCell className="max-w-[240px] text-muted-foreground">
                {rsvp.message || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmptyRow({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-dashed border-silver bg-card/30 p-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
