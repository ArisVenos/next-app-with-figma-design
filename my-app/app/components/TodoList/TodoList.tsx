import { Todo } from "../types/types";
import { useCustomTranslation } from "../Providers/Translation";
import { Table } from "./Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useDataProvider } from "../Providers/DataProvider";
import { CellRender } from "./CellRender";
import { headers } from "../Utilities/utils";
import { EditCell } from "./EditCell";
import { ButtonCell } from "./ButtonCell";

const columnHelper = createColumnHelper<Todo>();

export function TodoList() {
  const { translate } = useCustomTranslation();
  const {
    resultData: data,
    handleSave,
    editModeId,
    isPendingAdd,
    isPendingRemove,
    isPendingUpdate,
    addTempTodo,
  } = useDataProvider();

  const columns = [
    ...headers.map((element) =>
      columnHelper.accessor(element, {
        id: element,
        header: () => translate(element),
        cell: (info) => {
          const columnHeader = info.column.id;
          const rowValue = info.row.original[element];
          const idx = info.row.index + 1;
          const formId = info.row.id;
          return editModeId === info.row.original.id ? (
            <EditCell
              element={element}
              formId={formId}
              idx={idx}
              info={info}
              key={element}
            />
          ) : (
            <CellRender
              rowValue={rowValue}
              header={columnHeader}
              index={idx}
              id={info.row.original.id}
            />
          );
        },
      })
    ),
    columnHelper.accessor("id", {
      id: "actions",
      header: translate("actions"),
      cell: (info) => {
        const rowTodoId = info.row.original.id;
        const formId = info.row.id;
        return (
          <ButtonCell
            formId={formId}
            rowTodoId={rowTodoId}
            value={info.getValue()}
          />
        );
      },
    }),
  ];

  if (isPendingAdd || isPendingRemove || isPendingUpdate) {
    return "Loading";
  }

  return (
    <Table
      data={data}
      columns={columns}
      handleSave={handleSave}
      addTempTodo={addTempTodo}
    />
  );
}
