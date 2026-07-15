import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatValueToBRL } from "@/lib/format-currency";
import { formatPhone } from "@/lib/format-phone";
import type { GiftConfirmationRecord } from "@/types/forms";

type GiftConfirmationTableProps = {
  giftConfirmations: GiftConfirmationRecord[];
};

export function GiftConfirmationTable(props: GiftConfirmationTableProps) {
  const { giftConfirmations } = props;

  if (giftConfirmations.length === 0) {
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
          {giftConfirmations.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{formatPhone(user.phone ?? "—")}</TableCell>
              <TableCell>{user.name ?? "—"}</TableCell>
              <TableCell className="text-right">
                {formatValueToBRL(user.paidValue ?? "—")}
              </TableCell>
              <TableCell className="max-w-60 truncate text-muted-foreground">
                {user.observation}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
