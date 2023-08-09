import { useState, useRef } from "react";
import useCloseModal from "../assets/useCloseModal";

interface NewBoardModalProps {
  onClose: () => void;
}

const NewBoardModal = ({ onClose }: NewBoardModalProps) => {
  const [columns, setColumns] = useState<string[]>([""]);
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, onClose);

  const handleAddColumns = () => {
    setColumns([...columns, ""]);
  };

  const handleColumnsChange = (index: number, value: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  const handleRemoveColumns = (index: number) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    setColumns(updatedColumns);
  };

  return (
    <div
      ref={modalRef}
      className={`absolute z-10 w-[480px] px-8 flex flex-col justify-center items-center rounded-lg dark:bg-dark-grey dark:text-white bg-white text-black`}
    >
      <h1 className="text-heading-l mt-8 mb-6 w-full">Add New Board</h1>
      <div className="w-full flex items-start flex-col gap-1 mb-6">
        <label className="text-body-m text-medium-grey">Name</label>
        <input
          type="text"
          placeholder=""
          className={`border rounded-md w-full h-10 px-2 focus:outline-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-lig`}
        ></input>
      </div>
      <div className="w-full flex items-start flex-col gap-2">
        <label className="text-body-m text-medium-grey">Columns</label>
        {columns.map((column, index) => (
          <div className="flex flex-row items-center gap-4 w-full" key={index}>
            <input
              type="text"
              value={column}
              className={`border rounded-md w-full h-10 px-2 focus:outline-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-light`}
              onChange={(e) => handleColumnsChange(index, e.target.value)}
            ></input>
            <div className="group hover:cursor-pointer">
              <svg
                className="w-[14px] h-[15px]"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleRemoveColumns(index)}
              >
                <g
                  className="fill-[#828FA3] group-hover:fill-[#EA5555]"
                  fillRule="evenodd"
                >
                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                </g>
              </svg>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`w-full h-[40px] border border-none text-main-purple font-bold rounded-full text-body-l my-3 dark:bg-white bg-light-grey hover:bg-main-purple-hover hover:bg-opacity-25`}
        onClick={handleAddColumns}
        type="button"
      >
        + Add New Column
      </button>
      <div className="w-full mb-8 mt-6">
        <button className="w-full h-[40px] border border-none bg-main-purple my-3 hover:bg-main-purple-hover text-white font-bold rounded-full text-body-l">
          Create New Board
        </button>
      </div>
    </div>
  );
};

export default NewBoardModal;
