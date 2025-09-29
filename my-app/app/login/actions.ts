"use server";

import { redirect } from "next/navigation";

export async function submit(formdata: FormData) {
  const rawFormData = {
    username: formdata.get("username"),
    password: formdata.get("password"),
  };
  console.log(rawFormData);
  if (rawFormData.username === "user" && rawFormData.password === "1234") {
    redirect("/");
  }
}
