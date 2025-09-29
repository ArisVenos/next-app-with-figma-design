import "./globals.css";
import { getTodos } from "./actions";
import BaseContent from "./components/BaseContent";

export default async function Page() {
  const data = await getTodos();
  // console.log(data);
  return <BaseContent data={data} />;
}
