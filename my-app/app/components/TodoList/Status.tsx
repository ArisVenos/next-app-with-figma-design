import { statusType } from "../types/types";

const STATUS_RENDERER = {
  DUE: { value: "Due", styles: "bg-stRedBg text-stRedFont" },
  OPEN: { value: "Open", styles: "bg-stBlueBg text-stBlueFont" },
  PAID: { value: "Paid", styles: "bg-stGreenBg text-stGreenFont" },
  INACTIVE: { value: "Inactive", styles: "bg-stGrayBg text-stGrayFont" },
};

export function Status({ status }: { status: statusType }) {
  const { value, styles } = STATUS_RENDERER[status];
  return (
    <div>
      <span className={` ${styles} p-1 px-3 rounded-full text-xmd`}>
        {value}
      </span>
    </div>
  );
}
