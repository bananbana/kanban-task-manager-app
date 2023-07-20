import { useState } from "react";

interface NewBoardModalProps {
  isOpen: boolean;
  isDarkTheme: boolean;
}

const NewBoardModal = ({ isOpen, isDarkTheme }: NewBoardModalProps) => {
  const [columns, setColumns] = useState<string[]>([""]);

  const handleAddColumns = () => {
    setColumns([...columns, ""]);
  };

  const handleColumnsChange = (index: number, value: string) => {
    const uptadedColumns = [...columns];
    uptadedColumns[index] = value;
    setColumns(uptadedColumns);
  };

  const handleRemoveColumns = (index: number) => {
    const uptadedColumns = columns.filter((_, i) => i !== index);
    setColumns(uptadedColumns);
  };

  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } absolute px-8 top-[175px] left-[480px] w-[480px] ${
        isDarkTheme ? "bg-dark-grey text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-heading-l pt-8">Add New Board</h1>
      <form>
        <div>
          <label className="text-body-m text-medium-grey pb-2">Name</label>
          <input
            type="text"
            placeholder=""
            className={`border rounded-md w-full h-10 px-2 focus:outline-main-purple ${
              isDarkTheme
                ? "bg-dark-grey border-lines-dark"
                : "border-lines-light"
            }`}
          ></input>
        </div>
        <div>
          <label className="text-body-m text-medium-grey pb-2">Columns</label>
          {columns.map((column, index) => (
            <div className="flex flex-row items-center pb-3" key={index}>
              <input
                type="text"
                value={column}
                className={`border rounded-md w-full h-10 px-2 focus:outline-main-purple ${
                  isDarkTheme
                    ? "bg-dark-grey border-lines-dark"
                    : "border-lines-light"
                }`}
                onChange={(e) => handleColumnsChange(index, e.target.value)}
              ></input>
              <div className="group pl-4 hover:cursor-pointer">
                <svg
                  className="w-[14px] h-[15px]"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleRemoveColumns(index)}
                >
                  <g
                    className="fill-[#828FA3] group-hover:fill-[#EA5555]"
                    fill-rule="evenodd"
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
          className={`w-full h-[40px] border border-none text-main-purple font-bold rounded-full text-body-l ${
            isDarkTheme
              ? "bg-white"
              : "bg-light-grey hover:bg-main-purple-hover hover:bg-opacity-25"
          }`}
          onClick={handleAddColumns}
          type="button"
        >
          + Add New Column
        </button>
        <div className="w-full mb-8 mt-6">
          <button className="w-full h-[40px] border border-none bg-main-purple hover:bg-main-purple-hover text-white font-bold rounded-full text-body-l">
            Create New Board
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBoardModal;
