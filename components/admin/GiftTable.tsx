"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GiftManagementForm } from "./GiftManagementForm";
import { deleteGiftAction } from "@/actions/gifts";
import { toast } from "sonner";
import type { Gift } from "@/types/forms";

type GiftTableProps = {
  gifts: Gift[];
  onRefresh: () => void;
};

export function GiftTable({ gifts, onRefresh }: GiftTableProps) {
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [deletingGiftId, setDeletingGiftId] = useState<string | null>(null);

  const handleEdit = (gift: Gift) => {
    setEditingGift(gift);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteGiftAction(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Presente deletado!");
      onRefresh();
    }
    setDeletingGiftId(null);
  };

  const handleFormSuccess = () => {
    setCreateDialogOpen(false);
    setEditDialogOpen(false);
    setEditingGift(null);
    onRefresh();
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(price));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Presentes</h2>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-silver-gradient text-black hover:opacity-90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo presente
        </Button>
      </div>

      {gifts.length === 0 ? (
        <div className="rounded-md border border-dashed p-8 text-center">
          <p className="text-muted-foreground">Nenhum presente cadastrado</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="w-32">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gifts.map((gift) => (
                <TableRow key={gift.id}>
                  <TableCell>
                    <div className="relative h-12 w-12">
                      <Image
                        src={gift.image}
                        alt={gift.name}
                        width={48}
                        height={48}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{gift.name}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {gift.description || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(gift.price)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(gift)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog
                        open={deletingGiftId === gift.id}
                        onOpenChange={(open) =>
                          setDeletingGiftId(open ? gift.id : null)
                        }
                      >
                        <AlertDialogTrigger
                          render={
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          }
                        ></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Deletar presente
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja deletar o presente{" "}
                              {gift.name}? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(gift.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Deletar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog de criação */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo presente</DialogTitle>
          </DialogHeader>
          <GiftManagementForm
            onSuccess={handleFormSuccess}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog de edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar presente</DialogTitle>
          </DialogHeader>
          {editingGift && (
            <GiftManagementForm
              gift={editingGift}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setEditDialogOpen(false);
                setEditingGift(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
