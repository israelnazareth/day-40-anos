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
import { GiftConfirmationsRecord } from "@/lib/db/schema";
import { Gift } from "@/types/forms";

type GiftConfirmationTableProps = {
  giftConfirmations: GiftConfirmationsRecord[];
  gifts: Gift[];
};

export function GiftConfirmationTable(props: GiftConfirmationTableProps) {
  const { giftConfirmations, gifts } = props;

  const giftMap = new Map(gifts.map((gift) => [gift.id, gift.name]));

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
          {giftConfirmations.map((giftConfirmation) => (
            <TableRow key={giftConfirmation.id}>
              <TableCell className="font-medium">
                {giftConfirmation.name}
              </TableCell>
              <TableCell>
                {formatPhone(giftConfirmation.phone ?? "—")}
              </TableCell>
              <TableCell>
                {giftMap.get(giftConfirmation.giftId) ?? "—"}
              </TableCell>
              <TableCell className="text-right">
                {formatValueToBRL(giftConfirmation.paidValue ?? "—")}
              </TableCell>
              <TableCell className="max-w-60 text-muted-foreground">
                {giftConfirmation.observation}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
