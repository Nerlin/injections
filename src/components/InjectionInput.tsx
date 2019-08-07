import * as React from "react";
import { useCallback, useState } from "react";
import { InjectionPoint } from "../state/Injections";

export interface InjectionInputProps {
  point: InjectionPoint;
  date?: string;
  onChange(point: InjectionPoint, date: string): void;
}

const InjectionInput: React.FC<InjectionInputProps> = ({
  date = "",
  point,
  onChange
}) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(point, e.currentTarget.value);
    },
    [point, onChange]
  );

  return (
    <input
      type={focused ? "date" : "text"}
      value={date}
      placeholder={point}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

export default InjectionInput;
