import * as React from "react";
import { useCallback, useState } from "react";
import { InjectionPoint } from "../state/Injections";

export interface InjectionInputProps {
  point: InjectionPoint;
  date?: Date;
  onChange(point: InjectionPoint, date: Date): void;
}

const InjectionInput: React.FC<InjectionInputProps> = ({
  date,
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
      onChange(point, new Date(Date.parse(e.currentTarget.value)));
    },
    [point, onChange]
  );

  return (
    <input
      type={focused ? "date" : "text"}
      value={date ? formatDate(date) : ""}
      placeholder={point}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${date
    .getMonth()
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
}

export default InjectionInput;
