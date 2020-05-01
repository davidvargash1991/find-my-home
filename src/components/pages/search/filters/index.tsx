import React from "react";
import styles from "./filters.module.scss";
import cx from "classnames";
import NumbersFilter from "components/ui/numbersFilter";
import InputRange from "react-input-range";
import { IPropertiesState } from "store/properties/reducer";
import Toggle from "react-toggle";

interface IFiltersProps {
  Properties: IPropertiesState;
  onChangeBudget: (budget: { min: number; max: number }) => void;
  onChangeBathrooms: (item: { amount: number; selected: boolean }) => void;
  onChangeRooms: (item: { amount: number; selected: boolean }) => void;
  onChangeArea: (budget: { min: number; max: number }) => void;
  onChangeParking: (parking: boolean) => void;
}

const Filters: React.FC<IFiltersProps> = (props) => {
  const {
    Properties,
    onChangeBudget,
    onChangeBathrooms,
    onChangeRooms,
    onChangeArea,
    onChangeParking,
  } = props;

  const formatPrice = (value: number) => {
    if (value < 1000000) {
      const result = Math.trunc(value / 1000);
      return `${result}K`;
    } else {
      const result = value / 1000000;
      return `${result.toFixed(2)}M`;
    }
  };

  const formatArea = (value: number) => {
    return `${value} m2`;
  };

  const handleRangeChange = (value: any) => {
    onChangeBudget(value);
  };

  const handleAreaChange = (value: any) => {
    onChangeArea(value);
  };

  const handleParkingChange = () => {
    onChangeParking(!Properties.filters.parking);
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Budget:</p>
      <InputRange
        draggableTrack
        minValue={Properties.filters.pricesRange.min}
        maxValue={Properties.filters.pricesRange.max}
        value={Properties.filters.budget}
        step={10000}
        formatLabel={formatPrice}
        onChange={handleRangeChange}
      />
      {Properties.filters.bathrooms.length > 1 && (
        <React.Fragment>
          <p className={cx(styles.label, styles.noMargin)}>Bathrooms:</p>
          <div className={styles.numericFilterContainer}>
            {Properties.filters.bathrooms.map((data) => (
              <NumbersFilter
                key={`B${data.amount}`}
                data={data}
                onChange={onChangeBathrooms}
              />
            ))}
          </div>
        </React.Fragment>
      )}
      {Properties.filters.rooms.length > 1 && (
        <React.Fragment>
          <p className={cx(styles.label, styles.noMargin)}>Rooms:</p>
          <div className={styles.numericFilterContainer}>
            {Properties.filters.rooms.map((data) => (
              <NumbersFilter
                key={`R${data.amount}`}
                data={data}
                onChange={onChangeRooms}
              />
            ))}
          </div>
        </React.Fragment>
      )}
      <p className={styles.label}>Area:</p>
      <InputRange
        draggableTrack
        minValue={Properties.filters.areaRange.min}
        maxValue={Properties.filters.areaRange.max}
        value={Properties.filters.area}
        step={1}
        formatLabel={formatArea}
        onChange={handleAreaChange}
      />
      <label className={styles.parking}>
        <Toggle
          defaultChecked={Properties.filters.parking}
          icons={false}
          onChange={handleParkingChange}
        />
        <span className={styles.label}>Parking</span>
      </label>
    </div>
  );
};

export default Filters;
