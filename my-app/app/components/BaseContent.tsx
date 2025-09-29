"use client";

import "../globals.css";
import { queryClient } from "../actions";
import { Content } from "./Content";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./Providers/ToastProvider";
import { TranslationProvider } from "./Providers/Translation";
import { Todo } from "./types/types";

export default function BaseContent({ data }: { data: Todo[] }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <ToastProvider>
          <Content data={data} />
        </ToastProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
}
