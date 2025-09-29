import { Column } from "@tanstack/react-table";
import { Dropdown } from "./Dropdown";

interface FilterProps<T> {
  nameColumn: Column<T, unknown> | undefined;
  statusColumn: Column<T, unknown> | undefined;
}

export function Filter<T>({ nameColumn, statusColumn }: FilterProps<T>) {
  const nameColumnFilterValue = nameColumn?.getFilterValue();
  const statusColumnFilterValue = statusColumn?.getFilterValue();

  const test = statusColumnFilterValue?.toString();

  return (
    <div className="self-end">
      <input
        className="rounded-lg shadow-s h-[32px] w-[320px] text-md border pl-3 ml-5"
        onChange={(event) => nameColumn?.setFilterValue(event.target.value)}
        placeholder={`Search...`}
        type="text"
        value={(nameColumnFilterValue?.toString() ?? "") as string}
      />
      <Dropdown
        allOption
        value={statusColumnFilterValue?.toString()}
        onChange={(event) => statusColumn?.setFilterValue(event.target.value)}
      />
    </div>
  );
}
