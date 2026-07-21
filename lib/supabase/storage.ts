import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

// Client para operações públicas (leitura)
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// Client para operações admin (upload/delete) - usa service role para bypass RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = "gift-images";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadGiftImage(
  file: File,
  eventSlug: string,
): Promise<string> {
  // Validações
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("A imagem deve ter no máximo 5MB");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Apenas JPG, PNG e WebP são permitidos");
  }

  // Gerar nome único
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${eventSlug}/${fileName}`;

  // Verificar se o bucket existe antes de tentar upload
  const { data: buckets, error: listError } =
    await supabaseAdmin.storage.listBuckets();
  if (listError) {
    throw new Error(`Erro ao listar buckets: ${listError.message}`);
  }

  const bucketExists = buckets?.some((b) => b.name === BUCKET_NAME);
  if (!bucketExists) {
    throw new Error(
      `Bucket "${BUCKET_NAME}" não encontrado. Buckets disponíveis: ${buckets?.map((b) => b.name).join(", ") || "nenhum"}`,
    );
  }

  // Upload
  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw new Error(`Erro ao fazer upload: ${error.message}`);
  }

  return filePath;
}

export async function deleteGiftImage(path: string): Promise<void> {
  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) {
    throw new Error(`Erro ao deletar imagem: ${error.message}`);
  }
}

export function getPublicUrl(path: string): string {
  const { data } = supabasePublic.storage.from(BUCKET_NAME).getPublicUrl(path);

  return data.publicUrl;
}
