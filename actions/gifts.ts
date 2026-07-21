"use server";

import { revalidatePath } from "next/cache";
import { createGiftSchema, updateGiftSchema } from "@/schemas/gifts";
import {
  createGift,
  deleteGift,
  getGiftById,
  updateGift,
} from "@/lib/db/queries/gifts";
import {
  deleteGiftImage,
  getPublicUrl,
  uploadGiftImage,
} from "@/lib/supabase/storage";
import { getEventBySlug } from "@/lib/db/queries/events";

export async function createGiftAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;
  const price = formData.get("price") as string;
  const image = formData.get("image") as File;

  // Validação
  const validation = createGiftSchema.safeParse({
    name,
    description,
    price,
    image,
  });

  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    };
  }

  try {
    // Obter evento
    const event = await getEventBySlug("day-40-anos");
    if (!event) {
      return { error: "Evento não encontrado" };
    }

    // Upload da imagem
    const imagePath = await uploadGiftImage(image, event.slug);
    const imageUrl = getPublicUrl(imagePath);

    // Criar presente
    await createGift({
      eventId: event.id,
      name,
      description,
      image: imageUrl,
      price,
    });

    revalidatePath("/admin");
    revalidatePath("/presentes");

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar presente:", error);
    return {
      error: error instanceof Error ? error.message : "Erro ao criar presente",
    };
  }
}

export async function updateGiftAction(id: string, formData: FormData) {
  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;
  const price = formData.get("price") as string | null;
  const image = formData.get("image") as File | null;

  // Validação
  const validation = updateGiftSchema.safeParse({
    name: name || undefined,
    description: description || undefined,
    price: price || undefined,
    image: image || undefined,
  });

  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    };
  }

  try {
    // Obter presente atual
    const currentGift = await getGiftById(id);
    if (!currentGift) {
      return { error: "Presente não encontrado" };
    }

    // Obter evento
    const event = await getEventBySlug("day-40-anos");
    if (!event) {
      return { error: "Evento não encontrado" };
    }

    let imageUrl = currentGift.image;
    let imagePath: string | null = null;

    // Se houver nova imagem, fazer upload
    if (image && image.size > 0) {
      imagePath = await uploadGiftImage(image, event.slug);
      imageUrl = getPublicUrl(imagePath);

      // Deletar imagem antiga
      const oldImagePath = currentGift.image.split("/").pop();
      if (oldImagePath) {
        await deleteGiftImage(`${event.slug}/${oldImagePath}`);
      }
    }

    // Atualizar presente
    await updateGift(id, {
      name: name || undefined,
      description: description !== "" ? description : null,
      image: imageUrl,
      price: price || undefined,
    });

    revalidatePath("/admin");
    revalidatePath("/presentes");

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar presente:", error);
    return {
      error:
        error instanceof Error ? error.message : "Erro ao atualizar presente",
    };
  }
}

export async function deleteGiftAction(id: string) {
  try {
    // Obter presente
    const gift = await getGiftById(id);
    if (!gift) {
      return { error: "Presente não encontrado" };
    }

    // Obter evento
    const event = await getEventBySlug("day-40-anos");
    if (!event) {
      return { error: "Evento não encontrado" };
    }

    // Deletar imagem do storage
    const imagePath = gift.image.split("/").pop();
    if (imagePath) {
      await deleteGiftImage(`${event.slug}/${imagePath}`);
    }

    // Deletar presente do banco
    await deleteGift(id);

    revalidatePath("/admin");
    revalidatePath("/presentes");

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar presente:", error);
    return {
      error:
        error instanceof Error ? error.message : "Erro ao deletar presente",
    };
  }
}
