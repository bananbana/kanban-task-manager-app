import { useEffect, useState } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { AxiosError } from "axios";
import { UserType } from "../types/UserType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBoards } from "../boards";
import { AdminTabs } from "./AdminTabs";

const allBoardsQuery = () => ({
  queryKey: ["boards-all"],
  queryFn: () => getAllBoards(),
});

const BoardAdmin = () => {
  const [content, setContent] = useState<string>("");

  const { data: boards } = useQuery(allBoardsQuery());
  const queryClient = useQueryClient();

  const [allUsers, setAllUsers] = useState<UserType[]>();

  useEffect(() => {
    const users = queryClient.getQueryData<UserType[]>(["users"]);
    if (users && boards) {
      setAllUsers(users);
    }
  }, [boards, queryClient]);

  useEffect(() => {
    UserService.getAdminBoard()
      .then((response) => {
        setContent(response.data as string);
      })
      .catch((error: AxiosError) => {
        setContent(
          ((error.response && error.response.data) as string) ||
            error.message ||
            "Error occurred"
        );

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }, []);

  return (
    <div
      id="container"
      className="h-full w-full flex justify-start items-center flex-col"
    >
      <header
        id="admin-header"
        className="border-b-2 border-lines-light dark:border-lines-dark w-full min-h-[140px] flex items-center text-heading-xl dark:text-white"
      >
        <h3 id="admin-header-content" className="ml-8">
          {content}
        </h3>
      </header>
      <div id="user-insights" className="w-full flex">
        <AdminTabs boards={boards} users={allUsers} />
      </div>
    </div>
  );
};

export default BoardAdmin;
