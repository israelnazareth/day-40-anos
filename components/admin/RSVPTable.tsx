import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RSVPRecord } from "@/types/forms";

export function RSVPTable({ data }: { data: RSVPRecord[] }) {
  if (data.length === 0) {
    return <EmptyRow message="Nenhuma confirmação recebida ainda." />;
  }
  return (
    <div className="overflow-x-auto rounded-md border border-silver">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Presença</TableHead>
            <TableHead className="text-right">Acomp.</TableHead>
            <TableHead>Mensagem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell>{r.phone}</TableCell>
              <TableCell className="text-right">{r.companions}</TableCell>
              <TableCell className="max-w-[240px] truncate text-muted-foreground">
                {r.message}
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
