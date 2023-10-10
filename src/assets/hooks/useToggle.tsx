import { useCallback, useState } from "react";

const useToggle = (defaultValue: boolean): [boolean, () => void] => {
  const [toggleValue, setToggleValue] = useState(defaultValue);

  const handleToggle = useCallback(() => {
    setToggleValue((defaultValue) => !defaultValue);
  }, []);
  return [toggleValue, handleToggle];
};

export default useToggle;
