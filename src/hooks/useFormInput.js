import { useState, useCallback } from "react";

export default function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return {
    value,
    onChange: handleChange,
    setValue
  };
}
