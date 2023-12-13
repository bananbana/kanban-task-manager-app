import React, { useRef, useState } from "react";
import InputAndDelete from "../components/InputAndDelete";
import useBoardMutation from "../assets/hooks/useMutateBoard";
import { useNavigate } from "react-router-dom";
import useCloseModal from "../assets/hooks/useCloseModal";
import { BoardData } from "../types/BoardTypes";

const NewBoard = () => {
  const [columns, setColumns] = useState([{ id: 1, value: "" }]);
  const [name, setName] = useState<string>("");
  const { createBoard } = useBoardMutation();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useCloseModal(modalRef, navigate);

  // const handleCreateBoard = (name: string, statusCodes: string[]) => {
  //   createBoard({ name, statusCodes });
  // };
  const handleCreateBoard = (
    name: string,
    statusCodes: string[]
  ): Promise<BoardData> => {
    return new Promise((resolve, reject) => {
      createBoard
        .mutateAsync({ name, statusCodes })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const addColumns = () => {
    const newId = Math.max(...columns.map((columns_) => columns_.id)) + 1;
    setColumns([...columns, { id: newId, value: "" }]);
  };
  const handleRemove = (id: number) => {
    setColumns((prevColumns) =>
      prevColumns.filter((columns_) => columns_.id !== id)
    );
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleColumnsChange = (id: number, value: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((columns_) => {
        if (columns_.id === id) {
          return { ...columns_, value };
        }
        return columns_;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredColumns = columns
      .map((column) => column.value)
      .filter((value) => value !== "");
    try {
      const response = await handleCreateBoard(name, filteredColumns);
      const newBoardId = response.id;
      navigate(`/user/boards/${newBoardId}`);
    } catch (error) {
      console.error("Error creating board: ", error);
    }
  };

  return (
    <div className="h-full w-screen backdrop-brightness-50 top-0 left-0 fixed z-40 flex justify-center items-center">
      <div
        ref={modalRef}
        className={`absolute h-fit overflow-auto z-10 w-[480px] px-8 flex flex-col justify-center items-center rounded-lg dark:bg-dark-grey dark:text-white bg-white text-black`}
      >
        <h1 className="text-heading-l mt-8 mb-6 w-full">Add New Board</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(e);
          }}
          className="w-full flex flex-col items-start"
        >
          <div className="w-full flex items-start flex-col gap-1 mb-6">
            <label className="text-body-m text-medium-grey">Name</label>
            <input
              placeholder="e.g. Web Design"
              type="text"
              name="name"
              defaultValue={name}
              onChange={handleNameChange}
              className={`border rounded-md w-full h-10 px-2 focus:border-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-light hover:border-main-purple dark:hover:border-main-purple`}
            ></input>
          </div>
          <div className="w-full flex items-start flex-col gap-3">
            <label className="text-body-m text-medium-grey">Columns</label>
            {columns.map((column) => (
              <InputAndDelete
                key={column.id}
                id={column.id}
                value={column.value}
                name="status"
                onChange={handleColumnsChange}
                handleRemove={handleRemove}
              />
            ))}
          </div>
          <button
            className={`w-full h-[40px] border border-none text-main-purple font-bold rounded-full text-body-l my-6 dark:bg-white bg-light-grey hover:bg-main-purple-hover hover:bg-opacity-25`}
            type="button"
            onClick={addColumns}
          >
            + Add New Column
          </button>
          <button
            className="w-full mb-8 h-[40px] border border-none bg-main-purple hover:bg-main-purple-hover text-white font-bold rounded-full text-body-l"
            type="submit"
          >
            Create New Board
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBoard;
