"use client";

import { Dispatch, SetStateAction } from "react";
import { addTodo, queryClient } from "../../actions";
import { revalidateData } from "../TodoList/revalidateData";
import { createTodo } from "../Utilities/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/types";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useToast } from "../Providers/ToastProvider";
import { useCustomTranslation } from "../Providers/Translation";
import { useDataProvider } from "../Providers/DataProvider";

interface AddButtonProps {
  addTempTodo: () => void;
}

export const AddButton = ({ addTempTodo }: AddButtonProps) => {
  const { translate } = useCustomTranslation();

  const onClick = () => {
    addTempTodo();
  };
  return (
    <button
      className="text-rw bg-addButton w-[136px] rounded-lg text-white p-2 font-inter mt-5 mr-5"
      onClick={onClick}
    >
      {translate("add customer")}
    </button>
  );
};
