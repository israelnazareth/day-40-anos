import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GiftConfirmationRecord } from "@/types/forms";

function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function GiftConfirmationTable({
  data,
}: {
  data: GiftConfirmationRecord[];
}) {
  if (data.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-silver bg-card/30 p-8 text-center text-sm text-muted-foreground">
        Nenhum presente confirmado ainda.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-md border border-silver">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Presente</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead>Observação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell>{r.phone}</TableCell>
              <TableCell>{r.gift_name ?? "—"}</TableCell>
              <TableCell className="text-right">{brl(r.amount)}</TableCell>
              <TableCell className="max-w-60 truncate text-muted-foreground">
                {r.note}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
