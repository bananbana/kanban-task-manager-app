import { useRef } from "react";
import useCloseModal from "../assets/hooks/useCloseModal";

interface DotDropDownProps {
  topContent: string;
  bottomContent: string;
  onClose: () => void;
  editContent: () => void;
  deleteContent: () => void;
  whatToDelete: string;
}

const DotDropDown = ({
  topContent,
  bottomContent,
  onClose,
  editContent,
  deleteContent,
}: DotDropDownProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useCloseModal(menuRef, onClose);

  return (
    <div
      ref={menuRef}
      className={`dark:bg-very-dark-grey bg-white flex flex-col shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] rounded-lg px-4 py-4`}
    >
      <span
        className="text-medium-grey w-40 mb-4 hover:cursor-pointer hover:text-dark-grey flex items-start"
        onClick={editContent}
      >
        {topContent}
      </span>
      <span
        className="text-destructive-red w-40 hover:cursor-pointer hover:text-red-hover flex items-start"
        onClick={deleteContent}
      >
        {bottomContent}
      </span>
    </div>
  );
};

export default DotDropDown;
