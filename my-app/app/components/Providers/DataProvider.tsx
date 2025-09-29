import { ReactNode, createContext, useContext, useTransition } from "react";
// import { useQuery, useMutation, MutateOptions } from "@tanstack/react-query";
// import { KyResponse } from "ky";
import { Todo } from "../types/types";
import { useToast } from "./ToastProvider";
import { useCustomTranslation } from "./Translation";
import { useState } from "react";
import { createTodo, invalidTodo } from "../Utilities/utils";
import { revalidateData } from "../TodoList/revalidateData";
import { useMutation } from "@tanstack/react-query";
import { removeTodo, updateTodo, addTodo } from "../../actions";

interface DataProviderContextType {
  resultData: Todo[];
  editData: Todo | {};
  editModeId: string;
  handleEdit: (id: string) => void;
  handleRemove: (id: string) => void;
  handleSave(formData: FormData): Promise<void>;
  handleCancel: () => void;
  handleBlur: (field: string) => void;
  addTempTodo(): void;
  isPendingAdd: boolean;
  isPendingRemove: boolean;
  isPendingUpdate: boolean;
  invalidFields: string[];
  setInvalidFields: (values: string[]) => void;
  pageIndex: number;
  pageCount: number;
  entriesPerPage: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

const DataProviderContext = createContext<DataProviderContextType | undefined>(
  undefined
);

export function DataProvider({
  children,
  data,
  dialogRef,
}: {
  children: ReactNode;
  data: Todo[];
  dialogRef: any;
}) {
  const { showMessage } = useToast();
  const { translate } = useCustomTranslation();

  const [editModeId, setEditModeId] = useState("");
  const [tempData, setTempData] = useState<Todo | undefined>();
  const [editData, setEditData] = useState<Todo | {}>({});
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const goToNextPage = () => {
    setPageIndex((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    setPageIndex((prev) => prev - 1);
  };

  const entriesPerPage = 5;
  const extraPage = data.length % entriesPerPage === 0 ? 0 : 1;
  const pageCount = Math.floor(data.length / entriesPerPage) + extraPage;

  // const resultData = tempData
  //   ? data.some((todo) => todo.id === tempData.id)
  //     ? data.map((todo) => (todo.id === tempData.id ? tempData : todo))
  //     : [...data, tempData]
  //   : data ?? [];

  const slicedData = data.slice(
    entriesPerPage * (pageIndex - 1),
    entriesPerPage * pageIndex
  );

  const resultData = tempData ? [...slicedData, tempData] : slicedData;

  const { mutate: removeTodoItem, isPending: isPendingRemove } = useMutation({
    mutationFn: (todoId: string) => removeTodo(todoId),
    onSuccess: async () => {
      await revalidateData("data");
      showMessage(translate("todoRemoved"));
    },
    onError: (error: any) => {
      console.error("Failed to remove todo:", error?.message);
    },
  });

  const { mutate: updateTodoItem, isPending: isPendingUpdate } = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo),
    onSuccess: async () => {
      await revalidateData("data");
      showMessage(translate("todoSaved"));
      setEditModeId("");
    },
    onError: (error: any) => {
      showMessage(error?.message || "Failed to update todo");
    },
  });

  const { mutate: addTodoItem, isPending: isPendingAdd } = useMutation({
    mutationFn: (newTodo: Todo) => addTodo(newTodo),
    onSuccess: async () => {
      await revalidateData("data");
      showMessage(translate("todoAdded"));
      setEditModeId("");
      setTempData(undefined);
    },
    onError: (error: any) => {
      showMessage(error?.message || "Failed to add todo");
    },
  });

  function addTempTodo() {
    const newTodo = createTodo();
    setEditModeId(newTodo.id);
    setTempData(newTodo);
  }

  const handleEdit = (id: string) => {
    console.log(id);
    const editTodo = data.find((todo) => todo.id === id) ?? {};
    setEditData(editTodo);
    setEditModeId(id);
  };

  const onRemove = (id: string) => {
    removeTodoItem(id);
    dialogRef.current?.close();
    revalidateData("data");
  };

  const handleRemove = (id: string) => {
    dialogRef.current?.open({
      values: {
        title: translate("removeTodo.title"),
        description: translate("removeTodo.description", id),
        onClick: () => onRemove(id),
      },
    });
  };

  const handleCancel = () => {
    setEditModeId("");
    setTempData(undefined);
    setInvalidFields([]);
    setEditData({});
    console.log(tempData);
  };

  async function handleSave(formData: FormData) {
    let updatedTodo = {} as Todo;
    for (const [key, value] of formData.entries()) {
      updatedTodo = {
        ...updatedTodo,
        [key]: value,
      };
    }

    setEditData(updatedTodo);

    console.log(updatedTodo);

    // had to create this extra const, checking invalidFields didnt
    const invalidFieldsResult = invalidTodo(updatedTodo);
    setInvalidFields(invalidFieldsResult);

    if (invalidFieldsResult.length > 0) {
      showMessage("Name, balance, deposit, rate must not be empty");
      return;
    }

    data?.some((todo) => todo.id === updatedTodo.id)
      ? updateTodoItem(updatedTodo)
      : addTodoItem(updatedTodo);

    setEditData({});
    setTempData(undefined);
  }

  const handleBlur = (field: string) => {
    setInvalidFields((prev) => prev.filter((element) => element !== field));
    // console.log(invalidFields);
  };

  // const handleChange = (e) => {
  //   setEditData((prev) => {
  //     prev[e.target.name];
  //   });
  // };

  const value = {
    resultData,
    editModeId,
    handleSave,
    handleCancel,
    addTempTodo,
    handleEdit,
    handleRemove,
    handleBlur,
    editData,
    isPendingAdd,
    isPendingRemove,
    isPendingUpdate,
    invalidFields,
    setInvalidFields,
    pageIndex,
    pageCount,
    entriesPerPage,
    goToNextPage,
    goToPrevPage,
  };

  return (
    <DataProviderContext.Provider value={value}>
      {children}
    </DataProviderContext.Provider>
  );
}

export function useDataProvider() {
  const context = useContext(DataProviderContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
