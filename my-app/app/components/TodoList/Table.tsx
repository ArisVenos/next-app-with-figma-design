"use client";

import { AddButton } from "../Buttons/AddButton";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  AccessorKeyColumnDef,
  getFilteredRowModel,
  RowExpanding,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { Todo } from "../types/types";
import { useCustomTranslation } from "../Providers/Translation";
import { ActionButton } from "../Buttons/ActionButton";
import * as React from "react";
import { Filter } from "./Filter";
import { useDataProvider } from "../Providers/DataProvider";

interface TablePropsType<T> {
  data: T[];
  columns: AccessorKeyColumnDef<T, string>[];
  handleSave: (formData: FormData) => Promise<void>;
  addTempTodo: () => void;
}

export function Table<T>({
  data,
  columns,
  handleSave,
  addTempTodo,
}: TablePropsType<T>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { pageIndex, pageCount, goToNextPage, goToPrevPage } =
    useDataProvider();

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    filterFns: {},
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const nameColumn = table.getColumn("name");

  const statusColumn = table.getColumn("status");

  return (
    <div className="flex-col grid justify-items-center max-w-[1150px] w-full overflow-x-auto drop-shadow-lg rounded-t-lg bg-tableHead ">
      <div className="place-self-stretch flex direction-row justify-between mb-3">
        <Filter nameColumn={nameColumn} statusColumn={statusColumn} />
        <div className=" self-end">
          <ActionButton
            className="bg-headerText hover:bg-slate-700 mr-1 h-9 w-9  disabled:bg-slate-400"
            onClick={goToPrevPage}
            disabled={pageIndex === 1}
            label="<"
          />
          <ActionButton
            className="bg-headerText hover:bg-slate-700 mr-3 mb-0 h-9 w-9 disabled:bg-slate-400"
            onClick={goToNextPage}
            disabled={pageIndex === pageCount}
            label=">"
          />
          <AddButton addTempTodo={addTempTodo} />
        </div>
      </div>
      <table className=" rounded-b-lg text-center  max-w-[1150px] w-full">
        <thead className=" rounded bg-tableHead">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className=" w-[100px] h-[40px] text-sm text-headerText"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-white even:bg-rows">
              <form id={row.id} action={handleSave} />
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="max-w-[100px] h-[64px]  text-md">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-12 place-content-center mr-3 justify-self-end">
        <span>{`page ${pageIndex} of ${pageCount}`}</span>
      </div>
    </div>
  );
}
