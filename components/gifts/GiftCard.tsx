import { Button } from "@/components/ui/button";
import { formatValueToBRL } from "@/lib/format-currency";
import type { Gift } from "@/types/forms";
import Image from "next/image";

export function GiftCard({
  gift,
  onSelect,
}: {
  gift: Gift;
  onSelect: (gift: Gift) => void;
}) {
  return (
    <div className="shadow-silver-glow flex flex-col rounded-lg border border-silver bg-card/50 p-5">
      <div className="text-silver-dim text-[0.65rem] uppercase tracking-widest">
        Presente
      </div>
      <h3 className="mt-1 font-display text-xl text-foreground">{gift.name}</h3>
      {gift.description && (
        <p className="text-muted-foreground mt-2 text-sm">{gift.description}</p>
      )}
      {gift.image && (
        <div className="mt-4 flex justify-center">
          <Image
            src={gift.image}
            alt={gift.name}
            width={300}
            height={300}
            className="w-auto rounded-lg object-cover"
            loading="eager"
          />
        </div>
      )}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-silver-dim text-[0.65rem] uppercase tracking-widest">
            Valor sugerido
          </div>
          <div className="text-silver-gradient font-display text-2xl">
            {formatValueToBRL(gift.price)}
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => onSelect(gift)}
          className="bg-silver-gradient text-black hover:opacity-90"
        >
          Vou presentear
        </Button>
      </div>
    </div>
  );
}
