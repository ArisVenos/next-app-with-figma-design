import { Todo } from "../types/types";
import { CellContext } from "@tanstack/react-table";
import { useDataProvider } from "../Providers/DataProvider";
import { Dropdown } from "./Dropdown";
import { useMemo, useState } from "react";

const numbers = ["rate", "deposit", "balance"];

interface EditCellProps {
  element: keyof Todo;
  formId: string;
  info: CellContext<Todo, string | number>;
  idx: number;
}

export function EditCell({ element, formId, info }: EditCellProps) {
  const { invalidFields, editData, handleBlur } = useDataProvider();

  const [value, setValue] = useState(editData[element]);

  const onBlur = (value: string, name: string) => {
    handleBlur(name);
    setValue(value);
  };

  return (
    <div className=" flex justify-center">
      {element === "status" ? (
        <Dropdown
          element={element}
          formId={formId}
          defaultValue={info.renderValue()}
        />
      ) : (
        <>
          <input
            value={value}
            className={`rounded-lg drop-shadow-sm h-8 w-20 text-md text-id pl-1 justify-center ${
              invalidFields.includes(element)
                ? "border-2 border-red-400 border-solid"
                : "border border-gray-400 border-solid"
            }`}
            type={numbers.includes(element) ? "number" : "text"}
            name={element}
            form={formId}
            hidden={element === "id"}
            onChange={(e) => setValue(e.target.value)}
          />
          {element === "id" ? <span className="text-center">#</span> : null}
        </>
      )}
    </div>
  );
}
