import { DialogProps } from "../Dialog";

export type statusType = "DUE" | "PAID" | "INACTIVE" | "OPEN";

export interface Todo {
  id: string;
  name: string;
  description: string;
  status: statusType;
  rate: number;
  balance: number;
  deposit: number;
}

type Base = {
  id: number;
  name?: string;
};

export interface Item extends Base {
  lastName: string;
  age: number;
  isActive: boolean;
  location: {
    city: string;
  };
}

export interface Values extends Base {
  title: string;
  description: string;
  config: {
    subText: string;
  };
  items: Item[];
}

export interface Credentials {
  username: string;
  password: string;
}

export type DialogType = {
  dialogRef: React.RefObject<{
    open: (options: DialogProps) => void;
  }>;
};
