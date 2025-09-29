import { Todo } from "./components/types/types";
import { QueryClient } from "@tanstack/react-query";
import ky from "ky";
import "next";

const url = "https://retoolapi.dev/5S5Z48";

export const queryClient = new QueryClient();

export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await ky.get<Todo[]>(`${url}/todos`, {
      next: { tags: ["data"] },
    });
    const data: Todo[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch todos");
  }
}

export async function addTodo(newTodo: Todo) {
  try {
    return ky.post(`${url}/todos`, { json: newTodo });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add todo");
  }
}

export async function removeTodo(id: string) {
  try {
    console.log(`Sending delete request to: ${url}/todos/${id}`);
    return ky.delete(`${url}/todos/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove todo");
  }
}

export async function updateTodo(updatedTodo: Todo) {
  try {
    return ky.put(`${url}/todos/${updatedTodo.id}`, {
      json: updatedTodo,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update todo");
  }
}
