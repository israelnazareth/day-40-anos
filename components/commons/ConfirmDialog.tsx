import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import Link from "next/link";

type ConfirmDialogProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ConfirmDialog({ setIsModalOpen }: ConfirmDialogProps) {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-sans">
            Presença confirmada!
          </AlertDialogTitle>
          <AlertDialogDescription>
            Obrigada por confirmar a sua presença!
          </AlertDialogDescription>
          <AlertDialogDescription>
            Estamos ansiosos para celebrar juntos! 💛
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Fechar
          </Button>
          <Button className="p-0">
            <Link
              href="/presentes"
              className="flex items-center justify-center w-full h-full p-4"
            >
              Lista de presentes
            </Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
