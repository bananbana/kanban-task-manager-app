import axios from "axios";
import Column from "./Column";
import BoardEmpty from "./BoardEmpty";
import Task from "./Task";
import useBoardDetails from "../assets/hooks/useBoardsDetails";

interface BoardProps {
  openedBoardId: number;
  openTask: (args: number) => void;
  openEditBoardModal: () => void;
}

const Board = ({ openedBoardId, openTask, openEditBoardModal }: BoardProps) => {
  const boardDetails = useBoardDetails(openedBoardId);
  const {
    statusCodesData,
    tasksData,
    statusCodesLoading,
    tasksLoading,
    statusCodesError,
    tasksError,
  } = boardDetails;
  if (statusCodesLoading || tasksLoading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (statusCodesError) {
    return (
      <div>
        Error fetching status codes:{" "}
        {axios.isAxiosError(statusCodesError) && statusCodesError.message}
      </div>
    ); // Handle error state
  }

  if (tasksError) {
    return (
      <div>
        Error fetching tasks:{" "}
        {axios.isAxiosError(tasksError) && tasksError.message}
      </div>
    ); // Handle error state
  }

  return (
    <div className="dark:text-white text-black h-full overflow-hidden">
      {statusCodesData !== undefined ? (
        <div className="h-full overflow-auto">
          <div className="flex-row flex h-full">
            {statusCodesData.map((status) => {
              return (
                <Column
                  key={status.id}
                  boardId={status.boardId}
                  statusId={status.id}
                  statusName={status.name}
                  statusCount={
                    tasksData?.filter((tasks) => tasks.statusId === status.id)
                      .length
                  }
                >
                  {tasksData !== undefined &&
                    tasksData
                      .filter((tasks) => tasks.statusId === status.id)
                      .map((task) => {
                        return (
                          <Task
                            key={task.id}
                            openTask={openTask}
                            taskId={task.id}
                            taskTitle={task.title}
                          ></Task>
                        );
                      })}
                </Column>
              );
            })}
            <div
              className={`w-72 text-heading-xl text-medium-grey flex justify-center items-center group rounded-lg group hover:cursor-pointer h-full bg-gradient-to-b dark:from-dark-grey dark:to-very-dark-grey to-75% from-[rgba(233,239,250,1)] to-light-grey ml-6 my-[60px]`}
            >
              <span
                className="group-hover:text-main-purple group-hover:cursor-pointer"
                onClick={openEditBoardModal}
              >
                + New Column
              </span>
            </div>
          </div>
        </div>
      ) : (
        <BoardEmpty></BoardEmpty>
      )}
    </div>
  );
};

export default Board;
