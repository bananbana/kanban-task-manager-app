import React, { Fragment, useEffect, useRef, useState } from "react";

import { Form, useNavigate, useParams } from "react-router-dom";
import InputAndDelete from "../components/InputAndDelete";
import useBoardMutation from "../assets/hooks/useMutateBoard";
import { useQueryClient } from "@tanstack/react-query";
import { BoardDetails } from "../types/BoardTypes";
import { Dialog, Transition } from "@headlessui/react";
import useCloseModal from "../assets/hooks/useCloseModal";

const EditBoard = () => {
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const boardData = queryClient.getQueryData<BoardDetails>(["boards", boardId]);
  const { board, statusCodes } = boardData ?? {};
  const { editBoardName, editStatus, addStatus, deleteStatus } =
    useBoardMutation();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useCloseModal(modalRef, () => navigate(-1));

  //set data in state until put into request body
  const [columns, setColumns] = useState([{ id: 1, name: "" }]);
  const [name, setName] = useState("");

  //set existing status data as default state upon component rendering
  useEffect(() => {
    if (board && statusCodes) {
      setColumns(
        statusCodes.map((status) => ({ id: status.id, name: status.name }))
      );
      setName(board.name);
    }
  }, [statusCodes, board]);
  //state data changes functions
  const addColumns = () => {
    const newId = Math.max(...columns.map((columns_) => columns_.id)) + 1;
    setColumns([...columns, { id: newId, name: "" }]);
  };

  const handleColumnsChange = (id: number, name: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((columns_) => {
        if (columns_.id === id) {
          return { ...columns_, name };
        }
        return columns_;
      })
    );
  };
  const [removeId, setRemoveId] = useState<number | null>(null);

  const openConfirmation = (id: number) => {
    setRemoveId(id);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setRemoveId(null);
    setIsConfirmationOpen(false);
  };

  const handleRemove = (id: number) => {
    openConfirmation(id);
  };

  const confirmRemove = () => {
    if (removeId !== null) {
      // Perform the actual removal here
      console.log("Confirmed removal of column with id:", removeId);
      setColumns((prevColumns) =>
        prevColumns.filter((columns_) => columns_.id !== removeId)
      );
      closeConfirmation();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // db mutations functions
  const handleEditBoardName = (boardId: string, name: string) => {
    editBoardName({ boardId, name });
  };

  const handleEditStatus = (
    boardId: string,
    statusId: number,
    name: string
  ) => {
    editStatus({ boardId, statusId, name });
  };

  const handleAddStatus = (name: string, boardId: string) => {
    addStatus({ name, boardId });
  };

  const handleDeleteStatus = (boardId: string, statusId: number) => {
    deleteStatus({ boardId, statusId });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newColumns = columns.filter(
      (column) => !statusCodes?.some((status) => status.id === column.id)
    );
    const deletedColumns = statusCodes?.filter(
      (status) => !columns.some((column) => column.id === status.id)
    );
    if (boardId) {
      handleEditBoardName(boardId, name);
      newColumns.forEach((column) => handleAddStatus(column.name, boardId));
      columns
        .filter((column) => !newColumns.includes(column))
        .forEach((column) => {
          handleEditStatus(boardId, column.id, column.name);
        });
      deletedColumns?.forEach((column) =>
        handleDeleteStatus(boardId, column.id)
      );
    }
    void queryClient.invalidateQueries(["boards", boardId]);
    navigate(-1);
  };

  return (
    <div className="backdrop-overlay" id="backdrop">
      <div ref={modalRef} id="edit-board-modal" className="edit-modal">
        <h1 className="text-heading-l w-full px-6 my-6">Edit Board</h1>
        <Form
          method="put"
          id="edit-board-form"
          className="form px-6"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex items-start flex-col gap-1 mb-6">
            <label className="text-body-m text-medium-grey">Board Name</label>
            <input
              placeholder="e.g. Web Design"
              type="text"
              value={name}
              onChange={handleNameChange}
              className={`form-input`}
            ></input>
          </div>
          <div className="w-full flex items-start flex-col gap-1">
            <label className="text-body-m text-medium-grey">
              Board Columns
            </label>
            {columns.map((column) => (
              <InputAndDelete
                key={column.id}
                id={column.id}
                value={column.name}
                name={column.name}
                onChange={handleColumnsChange}
                handleRemove={handleRemove}
              />
            ))}
          </div>
          <button
            className={`w-full h-[40px] btn-secondary mb-6 mt-3`}
            type="button"
            onClick={addColumns}
          >
            + Add New Column
          </button>
          <button className="w-full h-[40px] btn-primary-s mb-8" type="submit">
            Save Changes
          </button>
        </Form>
        {isConfirmationOpen && (
          <Transition
            ref={modalRef}
            appear
            show={isConfirmationOpen}
            as={Fragment}
          >
            <Dialog
              as="div"
              id="confirmation-dialog"
              className="absolute top-2/3"
              onClose={closeConfirmation}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-heading-l text-destructive-red"
                  >
                    Delete this column?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this column? This action
                      will remove all tasks and subtasks and cannot be reversed.
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between w-full">
                    <button
                      id="confirm-btn"
                      className="h-10 bg-destructive-red w-48 rounded-full text-white hover:bg-red-hover"
                      onClick={confirmRemove}
                      autoFocus
                    >
                      Confirm
                    </button>
                    <button
                      id="cancel-btn"
                      className="h-10 bg-light-grey w-48 rounded-full text-main-purple hover:bg-main-purple/25 dark:hover:bg-white"
                      onClick={closeConfirmation}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </Dialog>
          </Transition>
        )}
      </div>
    </div>
  );
};

export default EditBoard;
