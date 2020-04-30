import React from "react";
import Select from "react-select";
import colors from "styles/colors";

export interface IDropdownOption {
  value: string;
  label: string;
}

interface IDropdownProps {
  placeholder: string;
  options: IDropdownOption[];
  onChange: (value: any) => void;
  value: any;
  width?: number;
}

const Dropdown: React.FC<IDropdownProps> = (props) => {
  const customStyles = {
    control: (provided: any, state: any) => {
      return {
        ...provided,
        width: props.width ? props.width : "100%",
        color: colors.text,
        fontSize: "1.5rem",
        fontFamily: '"Mukta",sans-serif',
        "&:hover": { borderColor: colors.text },
      };
    },
    option: (provided: any, state: any) => {
      return {
        ...provided,
        fontWeight: 400,
        fontSize: "1.5rem",
        padding: "12px 16px",
        cursor: "pointer",
      };
    },
  };
  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      styles={customStyles}
      options={props.options}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      isSearchable={false}
    />
  );
};

export default Dropdown;
