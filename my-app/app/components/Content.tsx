"use client";

// import appStyles from "../styles/App.module.css";
// import { useAuthentication } from "./IsAuthenticated";
// import { ActionButton } from "./Buttons/ActionButton";
import { TodoList } from "./TodoList/TodoList";
import { useRef } from "react";
import { useCustomTranslation } from "./Providers/Translation";
import { DataProvider } from "./Providers/DataProvider";
import { Todo } from "./types/types";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "./Dialog";
import { DialogProps } from "./Dialog";

export function Content({ data }: { data: Todo[] }) {
  const router = useRouter();
  const { translate, toggleLanguage } = useCustomTranslation();

  // const handleLogout = () => {
  //   router.push("./login");
  // };
  // const logOut = () => {
  //   dialogRef.current?.open({
  //     values: {
  //       title: translate("logOut.title"),
  //       description: translate("logOut.description"),
  //       onClick: handleLogout,
  //     },
  //   });
  // };

  const dialogRef = useRef<DialogProps>(null);

  return (
    <div>
      <header>
        <h3 className="text-5xl place-self-center mt-3 ">
          <p>{translate("header")}</p>
        </h3>
      </header>
      <main>
        {/* {isAuthenticated ? ( */}
        <>
          {/* <ActionButton
            className="float-right mr-20 bg-red-600 hover:bg-red-700"
            label={translate("logOutButton")}
            onClick={logOut}
          />
          <ActionButton
            className="ml-20 bg-orange-600 hover:bg-orange-700"
            label={translate("languageButton")}
            onClick={toggleLanguage}
          /> */}
          <div className="place-items-center">
            <DataProvider data={data} dialogRef={dialogRef}>
              <TodoList />
            </DataProvider>
            <ConfirmationDialog ref={dialogRef} />
          </div>
        </>
        {/* ) : (
          <div className={appStyles.login}>
            <Login />
          </div>
        )} */}
      </main>
    </div>
  );
}
