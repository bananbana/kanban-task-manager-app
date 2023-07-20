interface BoardEmptyProps {
  openBoardModal: () => void;
}

const BoardEmpty = ({ openBoardModal }: BoardEmptyProps) => {
  return (
    <div className="bg-none flex flex-col items-center absolute top-[461px] left-[622.5px]">
      <p className="text-medium-grey text-heading-l pb-[32px]">
        This board is empty. Create a new column to get started
      </p>
      <button
        className="h-[48px] hover:bg-main-purple-hover bg-main-purple text-white rounded-full w-[174px] text-heading-m"
        onClick={() => openBoardModal()}
      >
        + Add New Column
      </button>
    </div>
  );
};

export default BoardEmpty;
