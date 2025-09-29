import { Todo } from "../types/types";

interface DropdownProps {
  defaultValue?: string | number | null;
  value?: string | undefined;
  element?: keyof Todo;
  formId?: string;
  onChange?: (event: any) => void | undefined;
  allOption?: boolean;
}

export function Dropdown({
  element,
  formId,
  defaultValue,
  value,
  onChange,
  allOption,
}: DropdownProps) {
  const handleChange = onChange ?? (() => {});

  return (
    <select
      defaultValue={defaultValue || undefined}
      className="h-[22px] place-self-center width-[50px] ml-3 border-2 rounded text-md dropshadow-md"
      name={element}
      itemType="text"
      form={formId}
      onChange={handleChange}
      value={value}
    >
      {allOption && <option value="">All</option>}
      <option value="PAID" className="text-stGreenFont">
        Paid
      </option>
      <option value="OPEN" className="text-stBlueFont">
        Open
      </option>
      <option value="INACTIVE" className="text-stGrayFont">
        Inactive
      </option>
      <option value="DUE" className="text-stRedFont">
        Due
      </option>
    </select>
  );
}
