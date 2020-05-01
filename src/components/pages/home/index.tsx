import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import styles from "./home.module.scss";
import Title from "components/ui/title";
import Dropdown, { IDropdownOption } from "components/ui/dropdown";
import { cities, types, operations } from "data";

interface IHomeProps extends RouteComponentProps {
  onGetSearchResults: (
    city: string,
    propertyType: string,
    operation: string
  ) => void;
}

const Home: React.FC<IHomeProps> = (props) => {
  const [city, setCity] = useState<IDropdownOption | null>(null);
  const [type, setType] = useState<IDropdownOption | null>(null);
  const [operation, setOperation] = useState<IDropdownOption | null>(null);

  const citiesDDL = cities.map((city) => {
    return { value: city.value, label: city.label };
  });

  const handleSearchClick = () => {
    if (city && type && operation) {
      props.onGetSearchResults(city.value, type.value, operation.value);
      props.history.push(
        `/search?city=${city.value}&type=${type.value}&operation=${operation.value}`
      );
    }
  };

  const handleCityChange = (value: any) => {
    setCity(value);
  };

  const handleTypeChange = (value: any) => {
    setType(value);
  };

  const handleOperationChange = (value: any) => {
    setOperation(value);
  };

  const isButtonDisabled = city === null || type === null || operation === null;

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.searchBox}>
            <Title text="Find your dreamed home" />
            <div className={styles.dropdown}>
              <Dropdown
                placeholder="Select a city"
                options={citiesDDL}
                value={city}
                onChange={handleCityChange}
              />
            </div>
            <div className={styles.dropdown}>
              <Dropdown
                placeholder="Select a home type"
                options={types}
                value={type}
                onChange={handleTypeChange}
              />
            </div>
            <div className={styles.dropdown}>
              <Dropdown
                placeholder="I want to"
                options={operations}
                value={operation}
                onChange={handleOperationChange}
              />
            </div>
            <button
              className={styles.button}
              disabled={isButtonDisabled}
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <p className={styles.author}>Created by David vargas</p>
    </React.Fragment>
  );
};

export default withRouter(Home);
