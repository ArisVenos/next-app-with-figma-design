import * as Dialog from "@radix-ui/react-dialog";
import todoStyles from "../styles/Todo.module.css";
import { ActionButton } from "./Buttons/ActionButton";
import { useState, useImperativeHandle, forwardRef } from "react";
import { useCustomTranslation } from "./Providers/Translation";

type OpenProps = {
  values: { title: string; description: string; onClick: () => void };
};

export interface DialogProps {
  open: (value: OpenProps) => void;
  close: () => void;
}

//could use useImperativeHandle for open/close but triger and close are already implemented
const ConfirmationDialog = forwardRef<DialogProps>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    values: { title: "", description: "", onClick: () => {} },
  });

  const { translate } = useCustomTranslation();

  useImperativeHandle(
    ref,
    () => ({
      open: (whatever) => {
        setOpen(true);
        setValue(whatever);
      },
      close: () => setOpen(false),
    }),
    []
  );
  return (
    <Dialog.Root open={open}>
      <Dialog.DialogOverlay className={todoStyles.overlay} />
      <Dialog.Content className={todoStyles.content}>
        <Dialog.Title>{value.values.title}</Dialog.Title>
        <Dialog.Description>{value.values.description}</Dialog.Description>
        <Dialog.Close asChild>
          <ActionButton
            onClick={() => {
              setOpen(true);
              value.values.onClick();
            }}
            label={translate("confirm")}
            className="bg-green-500 hover:bg-green-600"
          />
        </Dialog.Close>
        <Dialog.Close asChild>
          <ActionButton
            onClick={() => {
              setOpen(false);
            }}
            label={translate("cancel")}
            className="ml-3 bg-red-500 hover:bg-red-600"
          />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
});

ConfirmationDialog.displayName = "ConfirmationDialog";
export default ConfirmationDialog;
