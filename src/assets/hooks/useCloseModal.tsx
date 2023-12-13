import { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";

const useCloseModal = (
  ref: React.RefObject<HTMLElement>,
  onClose: NavigateFunction
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
};

export default useCloseModal;
