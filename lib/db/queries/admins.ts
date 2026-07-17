import { db } from "../";

export async function getAdminByEmail(email: string) {
  return db.query.admins.findFirst({
    where: (admin, { eq }) => eq(admin.email, email),
  });
}
