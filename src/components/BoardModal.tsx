import { useState, useRef, useEffect } from "react";
import useCloseModal from "../assets/hooks/useCloseMenu";
import InputAndDelete from "./InputAndDelete";
import useBoards from "../assets/hooks/useBoard";
import useBoardDetails from "../assets/hooks/useBoard";
import useBoardMutation from "../assets/hooks/useMutateBoard";

interface BoardModalProps {
  onClose: () => void;
  createBoardModal: boolean;
  editBoardModal: boolean;
  openedBoardId: number;
}

const BoardModal = ({
  onClose,
  createBoardModal,
  editBoardModal,
  openedBoardId,
}: BoardModalProps) => {
  const { data } = useBoards();
  const { statusCodesData } = useBoardDetails(openedBoardId);
  const { editBoardName, editStatus, createBoard, addStatus, deleteStatus } =
    useBoardMutation();

  const handleEditBoardName = (boardId: number, name: string) => {
    editBoardName({ boardId, name });
    onClose();
  };

  const handleCreateBoard = (name: string, statusCodes: string[]) => {
    createBoard({ name, statusCodes });
    onClose();
  };

  const handleEditStatus = (
    boardId: number,
    statusId: number,
    name: string
  ) => {
    editStatus({ boardId, statusId, name });
  };

  const handleAddStatus = (name: string, boardId: number) => {
    addStatus({ name, boardId });
  };

  const handleDeleteStatus = (boardId: number, statusId: number) => {
    deleteStatus({ boardId, statusId });
  };

  useEffect(() => {
    if (editBoardModal && statusCodesData) {
      setColumns(
        statusCodesData.map((status) => ({ id: status.id, value: status.name }))
      );
    } else if (createBoardModal) {
      setName("");
    }
  }, [createBoardModal, editBoardModal, statusCodesData]);

  const modalRef = useRef<HTMLDivElement>(null);
  useCloseModal(modalRef, onClose);

  const openedBoard = data?.find((board) => board.id === openedBoardId);
  const [columns, setColumns] = useState([{ id: 1, value: "" }]);
  const [name, setName] = useState<string>(openedBoard ? openedBoard.name : "");

  const addColumns = () => {
    const newId = Math.max(...columns.map((columns_) => columns_.id)) + 1;
    setColumns([...columns, { id: newId, value: "" }]);
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

  const handleRemove = (id: number) => {
    setColumns((prevColumns) =>
      prevColumns.filter((columns_) => columns_.id !== id)
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredColumns = columns
      .map((column) => column.value)
      .filter((value) => value !== "");
    if (createBoardModal) {
      handleCreateBoard(name, filteredColumns);
    } else if (editBoardModal) {
      const newColumns = columns.filter(
        (column) => !statusCodesData?.some((status) => status.id === column.id)
      );
      const deletedColumns = statusCodesData?.filter(
        (status) => !columns.some((column) => column.id === status.id)
      );
      handleEditBoardName(openedBoardId, name);
      newColumns.forEach((column) => {
        handleAddStatus(column.value, openedBoardId);
      });
      columns
        .filter((column) => !newColumns.includes(column))
        .forEach((column) => {
          handleEditStatus(openedBoardId, column.id, column.value);
        });
      deletedColumns?.forEach((column) =>
        handleDeleteStatus(openedBoardId, column.id)
      );
    }
  };

  return (
    <div
      ref={modalRef}
      className={`absolute z-10 w-[480px] px-8 flex flex-col justify-center items-center rounded-lg dark:bg-dark-grey dark:text-white bg-white text-black`}
    >
      <h1 className="text-heading-l mt-8 mb-6 w-full">
        {(createBoardModal && "Add New Board") ||
          (editBoardModal && "Edit Board")}
      </h1>
      <form
        className="w-full flex flex-col items-start"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex items-start flex-col gap-1 mb-6">
          <label className="text-body-m text-medium-grey">
            {(createBoardModal && "Name") || (editBoardModal && "Board Name")}
          </label>
          <input
            placeholder="e.g. Web Design"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={`border rounded-md w-full h-10 px-2 focus:border-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-light hover:border-main-purple dark:hover:border-main-purple`}
          ></input>
        </div>
        <div className="w-full flex items-start flex-col gap-3">
          <label className="text-body-m text-medium-grey">
            {" "}
            {(createBoardModal && "Columns") ||
              (editBoardModal && "Board Columns")}
          </label>
          {columns.map((column) => (
            <InputAndDelete
              key={column.id}
              id={column.id}
              value={column.value}
              // onChange={handleColumnsChange}
              // handleRemove={handleRemove}
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
        <button className="w-full mb-8 h-[40px] border border-none bg-main-purple hover:bg-main-purple-hover text-white font-bold rounded-full text-body-l">
          {(editBoardModal && "Save Changes") ||
            (createBoardModal && "Create New Board")}
        </button>
      </form>
    </div>
  );
};

export default BoardModal;
