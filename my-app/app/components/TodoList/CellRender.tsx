import { Status } from "./Status";
import { STATUS_VALUES } from "../Utilities/utils";
import { statusType } from "../types/types";
import { useDataProvider } from "../Providers/DataProvider";

interface CellRenderProps {
  rowValue: string | number;
  header: string;
  index: number;
  id: string;
}

export function CellRender({ rowValue, header, index, id }: CellRenderProps) {
  const { pageIndex, entriesPerPage } = useDataProvider();

  if (header === "id") {
    return <span>{(pageIndex - 1) * entriesPerPage + index}</span>;
  } else if (header === "name") {
    return (
      <>
        <span className="text-md truncate max-w-[100px] inline-block">
          {rowValue}
        </span>
        <br />
        <span className="text-id text-xmd truncate max-w-[100px] inline-block">
          {id}
        </span>
      </>
    );
  } else if (header === "description") {
    return (
      <span className="text-headerText text-md truncate max-w-[100px] inline-block">
        {rowValue}
      </span>
    );
  } else if (STATUS_VALUES.includes(rowValue as statusType)) {
    return <Status status={rowValue as statusType} />;
  } else if (
    header === "rate" ||
    header === "balance" ||
    header === "deposit"
  ) {
    return (
      <div style={{ color: (rowValue as number) < 0 ? "red" : "green" }}>
        ${rowValue}
        <br />
        <span className="text-id">CAD</span>
      </div>
    );
  }
}
