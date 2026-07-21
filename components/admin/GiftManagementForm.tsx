"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGiftSchema, updateGiftSchema } from "@/schemas/gifts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createGiftAction, updateGiftAction } from "@/actions/gifts";
import type { Gift } from "@/types/forms";
import { FileDropzone } from "@/components/ui/dropzone";
import { FileList } from "@/components/ui/file-list";

type GiftManagementFormProps = {
  gift?: Gift;
  onSuccess: () => void;
  onCancel: () => void;
};

export function GiftManagementForm({
  gift,
  onSuccess,
  onCancel,
}: GiftManagementFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {},
  );

  const schema = gift ? updateGiftSchema : createGiftSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: gift?.name ?? "",
      description: gift?.description ?? "",
      price: gift?.price ?? "",
      image: undefined,
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load existing image when editing
  useEffect(() => {
    if (gift?.image) {
      fetch(gift.image)
        .then((res) => res.blob())
        .then((blob) => {
          const fileName = gift.image.split("/").pop() || "image.jpg";
          const file = new File([blob], fileName, { type: blob.type });
          setUploadedFiles([file]);
          setFileProgresses({ [fileName]: 100 });
          form.setValue("image", file);
        })
        .catch((err) => {
          console.error("Failed to load existing image:", err);
        });
    }
  }, [gift?.image, form]);

  const handleFileSelect = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      setUploadedFiles([file]);
      setFileProgresses({ [file.name]: 100 });
      form.setValue("image", file, { shouldValidate: true });
    }
  };

  const removeFile = (filename: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== filename));
    setFileProgresses((prev) => {
      const newProgresses = { ...prev };
      delete newProgresses[filename];
      return newProgresses;
    });
    form.setValue("image", undefined);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const onSubmit = async (values: {
    name?: string;
    description?: string | null;
    price?: string;
    image?: File;
  }) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name || "");
      formData.append("description", values.description || "");
      formData.append("price", values.price || "");

      if (values.image && values.image instanceof File) {
        formData.append("image", values.image);
      }

      const result = gift
        ? await updateGiftAction(gift.id, formData)
        : await createGiftAction(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(gift ? "Presente atualizado!" : "Presente criado!");
        onSuccess();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="gift-name">Nome *</Label>
        <Input id="gift-name" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive">
            {form.formState.errors.name.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gift-description">Descrição (opcional)</Label>
        <Textarea
          id="gift-description"
          rows={3}
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-xs text-destructive">
            {form.formState.errors.description.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gift-price">Preço *</Label>
        <Input
          id="gift-price"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...form.register("price")}
        />
        {form.formState.errors.price && (
          <p className="text-xs text-destructive">
            {form.formState.errors.price.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Imagem *</Label>
        <FileDropzone
          fileInputRef={fileInputRef}
          handleBoxClick={handleBoxClick}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileSelect={handleFileSelect}
        />
        {form.formState.errors.image && (
          <p className="text-xs text-destructive">
            {form.formState.errors.image.message as string}
          </p>
        )}
      </div>

      <FileList
        uploadedFiles={uploadedFiles}
        fileProgresses={fileProgresses}
        removeFile={removeFile}
      />

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-silver-gradient text-black hover:opacity-90"
        >
          {isSubmitting
            ? "Salvando..."
            : gift
              ? "Atualizar presente"
              : "Criar presente"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
