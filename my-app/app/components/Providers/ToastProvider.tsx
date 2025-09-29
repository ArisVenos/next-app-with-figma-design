import { ReactNode, useState, createContext } from "react";
import * as Toast from "@radix-ui/react-toast";
import { useContext } from "react";
import toastStyles from "./ToastStyles.module.css";

interface ToastContextType {
  showMessage: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");

  function showMessage(message: string) {
    setMessage(message);
    setOpen(true);
  }

  const value = {
    showMessage,
  };

  return (
    <ToastContext.Provider value={value}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={toastStyles.ToastRoot}
        >
          <Toast.Title>{message}</Toast.Title>
          <Toast.Action asChild altText="Goto schedule to undo">
            <button className="text-xl bg-red-600 bg-contain border-solid border-2 border-black rounded-lg p-2 font-serif ml-10 mt-3 hover:bg-red-400">
              Close
            </button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className={toastStyles.ToastViewport} />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
