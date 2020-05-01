import React from "react";
import styles from "./filter.module.scss";
import cx from "classnames";

interface INumbersFilter {
  data: {
    amount: number;
    selected: boolean;
  };
  onChange: (item: { amount: number; selected: boolean }) => void;
}

const NumbersFilter: React.FC<INumbersFilter> = ({ data, onChange }) => {
  const handleItemClick = () => {
    onChange({ amount: data.amount, selected: !data.selected });
  };
  return (
    <div
      className={cx(styles.filter, data.selected ? styles.selected : "")}
      onClick={handleItemClick}
    >
      {data.amount}
    </div>
  );
};

export default NumbersFilter;
