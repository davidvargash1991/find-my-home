import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import styles from "./search.module.scss";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Dropdown, { IDropdownOption } from "components/ui/dropdown";
import { cities, types, operations, properties } from "data";
import Result from "components/ui/result";
import "leaflet/dist/leaflet.css";

const Search: React.FC<RouteComponentProps> = (props) => {
  const citiesDDL = cities.map((city) => {
    return { value: city.value, label: city.label };
  });

  const query = props.location.search.substr(1).split("&");
  let search: any = {};
  query.forEach((item) => {
    const data = item.split("=");
    search[data[0]] = data[1];
  });
  const city = cities.filter((city) => city.value === search.city)[0];
  const position = { lat: city.lat, lng: city.lng };

  const [cityDDL, setCityDDL] = useState<IDropdownOption>({
    label: city.label,
    value: city.value,
  });
  const [type, setType] = useState<IDropdownOption>(
    types.filter((type) => type.value === search.type)[0]
  );
  const [operation, setOperation] = useState<IDropdownOption>(
    operations.filter((op) => op.value === search.operation)[0]
  );

  const data = properties.filter(
    (property) =>
      property.city === cityDDL.value &&
      property.type === type.value &&
      property.operations.find((op) => op === operation.value)
  );

  const handleCityChange = (value: any) => {
    setCityDDL(value);
  };

  const handleTypeChange = (value: any) => {
    setType(value);
  };

  const handleOperationChange = (value: any) => {
    setOperation(value);
  };

  const HandleSearchClick = () => {
    props.history.push(
      `/search?city=${cityDDL.value}&type=${type.value}&operation=${operation.value}`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.params}>
          <Dropdown
            placeholder="Select a city"
            options={citiesDDL}
            value={cityDDL}
            onChange={handleCityChange}
            width={250}
          />
          <Dropdown
            placeholder="Select a home type"
            options={types}
            value={type}
            onChange={handleTypeChange}
            width={250}
          />
          <Dropdown
            placeholder="I want to"
            options={operations}
            value={operation}
            onChange={handleOperationChange}
            width={250}
          />
          <button className={styles.button} onClick={HandleSearchClick}>
            Search
          </button>
        </div>
        <div className={styles.layout}>
          <div className={styles.filters}></div>
          <div className={styles.results}>
            <Map className={styles.map} center={position} zoom={10}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {data.map((item, idx) => {
                const markerPos = { lat: item.lat, lng: item.lng };
                return (
                  <Marker key={`M${idx}`} position={markerPos}>
                    <Popup>
                      A pretty CSS3 popup.
                      <br />
                      Easily customizable.
                    </Popup>
                  </Marker>
                );
              })}
            </Map>
            {data.map((item, idx) => {
              return (
                <Result
                  key={`R${idx}`}
                  property={item}
                  city={city.label}
                  type={type.label}
                  operation={operation.value}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Search);
