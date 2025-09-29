"use server";

import { revalidateTag } from "next/cache";

export async function revalidateData(tag: "data" | "user") {
  revalidateTag(tag);
}
