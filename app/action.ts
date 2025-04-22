"use server";

export async function handleForm(prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { email, username, password } = data;
  console.log(data);
  if (!email || !username || !password) {
    return {
      errors: ["all fields are required"],
    };
  }
  if (password !== "12345") {
    return {
      errors: ["check Password again"],
    };
  }
  return { success: true };
}
