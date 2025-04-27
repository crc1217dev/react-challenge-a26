"use server";
import z from "zod";

const formSchema = z.object({
  username: z.string().min(5, "less than 5 characters"),
  email: z
    .string()
    .email()
    .refine((email) => email.includes("@zod.com"), {
      message: "Email must be from zod.com",
    }),
  password: z
    .string()
    .min(10, "morn than 10 characters")
    .regex(/\d/, "Must contain a number"),
});
export async function handleForm(prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.flatten() };
  }
  return { success: true };
}
