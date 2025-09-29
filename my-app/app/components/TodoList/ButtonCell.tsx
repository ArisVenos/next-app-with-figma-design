import { useDataProvider } from "../Providers/DataProvider";
import { ActionButton } from "../Buttons/ActionButton";
import { useCustomTranslation } from "../Providers/Translation";

interface ButtonCellProps {
  rowTodoId: string;
  formId: string;
  value: string;
}

export function ButtonCell({ rowTodoId, formId, value }: ButtonCellProps) {
  const { editModeId, handleEdit, handleCancel, handleRemove } =
    useDataProvider();
  const { translate } = useCustomTranslation();

  return editModeId === rowTodoId ? (
    <div className="self-center flex justify-center gap-1 pr-1">
      <button
        type="submit"
        form={formId}
        className="text-rw bg-stGreenFont hover:bg-green-800 rounded-lg w-[80px] text-white p-2 font-inter  mt-1"
      >
        {translate("save")}
      </button>
      <ActionButton
        type="button"
        onClick={handleCancel}
        label={translate("cancel")}
        className=" bg-stRedFont hover:bg-red-800"
      />
    </div>
  ) : (
    <div className="self-center flex justify-center gap-1 pr-1">
      <ActionButton
        onClick={() => handleEdit(value)}
        disabled={editModeId !== ""}
        label={translate("edit")}
        className=" bg-cyan-500 hover:bg-cyan-600"
      />
      <ActionButton
        onClick={() => handleRemove(value)}
        label={translate("remove")}
        className=" bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
