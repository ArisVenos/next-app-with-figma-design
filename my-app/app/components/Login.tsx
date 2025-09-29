"use server";

import { submit } from "../login/actions";

export async function Login() {
  return (
    <form action={submit}>
      <div className="bg-background place-self-center flex flex-col">
        <label>username</label>
        <input
          placeholder="username"
          type="text"
          name="username"
          className="border-black border-2 border-solid rounded-md"
          autoFocus
        />
        <label className="text-xl">password</label>
        <input
          placeholder="password"
          name="password"
          type="text"
          className="border-black border-2 border-solid rounded-md"
        />
        <button
          type="submit"
          className="text-xl bg-orange-600 bg-contain border-solid border-2 border-black rounded-lg p-2 font-serif ml-3 w-40 mt-3 hover:bg-orange-400"
        >
          login
        </button>
      </div>
    </form>
  );
}
