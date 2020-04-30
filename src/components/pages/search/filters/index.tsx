import React, { useState } from "react";
import styles from "./filters.module.scss";
import InputRange from "react-input-range";
import { IProperty } from "data";

interface IFiltersProps {
  data: IProperty[];
}

const Filters: React.FC<IFiltersProps> = (props) => {
  const numbers = props.data.map((property) => {
    return property.buyPrice;
  });

  const min = Math.min.apply(null, numbers);
  const max = Math.max.apply(null, numbers);

  const [rangeValue, setRangeValue] = useState({ min: min, max: max });

  const formatLabel = (value: number) => {
    if (value < 1000000) {
      const result = Math.trunc(value / 1000);
      return `${result}K`;
    } else {
      const result = value / 1000000;
      return `${result.toFixed(2)}M`;
    }
  };

  const handleRangeChange = (value: any) => {
    setRangeValue(value);
  };

  return (
    <div className={styles.container}>
      <InputRange
        draggableTrack
        minValue={min}
        maxValue={max}
        value={rangeValue}
        step={10000}
        formatLabel={formatLabel}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default Filters;
