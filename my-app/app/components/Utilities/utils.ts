import { Todo } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { Credentials } from "../types/types";
import { Dispatch, SetStateAction } from "react";

const users: Credentials[] = [{ username: "username", password: "1234" }];

export function loginCheck(credentials: Credentials) {
  let value = false;
  users.forEach((user) => {
    if (
      credentials.username === user.username &&
      credentials.password === user.password
    )
      value = true;
  });
  return value;
}

export function createTodo() {
  const newTodo: Todo = {
    id: uuidv4(),
    name: "",
    description: "",
    status: "INACTIVE",
    rate: 0,
    balance: 0,
    deposit: 0,
  };
  return newTodo;
}
export const STATUS_VALUES = ["DUE", "OPEN", "PAID", "INACTIVE"] as const;

export function invalidTodo(todo: Todo): string[] {
  const invalidFields: string[] = [];

  if (Number.isNaN(todo.balance) || todo.balance.toString() === "") {
    invalidFields.push("balance");
  }
  if (Number.isNaN(todo.rate) || todo.rate.toString() === "") {
    invalidFields.push("rate");
  }
  if (Number.isNaN(todo.deposit) || todo.deposit.toString() === "") {
    invalidFields.push("deposit");
  }
  if (todo.name.trim() === "") {
    invalidFields.push("name");
  }

  return invalidFields;
}

export const headers: (keyof Todo)[] = [
  "id",
  "name",
  "description",
  "status",
  "rate",
  "balance",
  "deposit",
];
