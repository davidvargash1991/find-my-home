import React, { PureComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import styles from "./search.module.scss";
import Filters from "./filters";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Dropdown, { IDropdownOption } from "components/ui/dropdown";
import { IPropertiesState } from "store/properties/reducer";
import Result from "components/ui/result";
import "leaflet/dist/leaflet.css";

interface ISearchProps extends RouteComponentProps {
  Properties: IPropertiesState;
  onGetSearchResults: (
    city: string,
    propertyType: string,
    operation: string
  ) => void;
  onChangeBudget: (budget: { min: number; max: number }) => void;
  onChangeBathrooms: (item: { amount: number; selected: boolean }) => void;
  onChangeRooms: (item: { amount: number; selected: boolean }) => void;
  onChangeArea: (budget: { min: number; max: number }) => void;
}

interface ISearchState {
  city: IDropdownOption;
  type: IDropdownOption;
  operation: IDropdownOption;
}

class Search extends PureComponent<ISearchProps, ISearchState> {
  public constructor(props: ISearchProps) {
    super(props);
    this.state = {
      city: { label: "", value: "" },
      type: { label: "", value: "" },
      operation: { label: "", value: "" },
    };
  }
  private handleCityChange = (value: any) => {
    this.setState({ city: value });
  };

  private handleTypeChange = (value: any) => {
    this.setState({ type: value });
  };

  private handleOperationChange = (value: any) => {
    this.setState({ operation: value });
  };

  private HandleSearchClick = () => {
    const { city, operation, type } = this.state;

    this.props.history.push(
      `/search?city=${city.value}&type=${type.value}&operation=${operation.value}`
    );
  };

  public componentDidMount() {
    const query = this.props.location.search.substr(1).split("&");
    let search: any = {};
    query.forEach((item) => {
      const data = item.split("=");
      search[data[0]] = data[1];
    });

    this.setState({
      city: this.props.Properties.cities.filter(
        (city) => city.value === search.city
      )[0],
      type: this.props.Properties.types.filter(
        (type) => type.value === search.type
      )[0],
      operation: this.props.Properties.operations.filter(
        (op) => op.value === search.operation
      )[0],
    });

    this.props.onGetSearchResults(search.city, search.type, search.operation);
  }

  public render() {
    const {
      Properties,
      onChangeBudget,
      onChangeBathrooms,
      onChangeRooms,
      onChangeArea,
    } = this.props;

    const { operation, type } = this.state;
    if (Properties.isLoading) {
      return null;
    }
    const city = Properties.cities.filter(
      (city) => city.value === Properties.filters.city
    )[0];
    const position = { lat: city.lat, lng: city.lng };

    const citiesDDL = Properties.cities.map((city) => {
      return { value: city.value, label: city.label };
    });

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.params}>
            <Dropdown
              placeholder="Select a city"
              options={citiesDDL}
              value={this.state.city}
              onChange={this.handleCityChange}
              width={250}
            />
            <Dropdown
              placeholder="Select a home type"
              options={Properties.types}
              value={type}
              onChange={this.handleTypeChange}
              width={250}
            />
            <Dropdown
              placeholder="I want to"
              options={Properties.operations}
              value={operation}
              onChange={this.handleOperationChange}
              width={250}
            />
            <button className={styles.button} onClick={this.HandleSearchClick}>
              Search
            </button>
          </div>
          <div className={styles.layout}>
            <div className={styles.filters}>
              <h2 className={styles.title}>Filters</h2>
              <Filters
                Properties={Properties}
                onChangeBudget={onChangeBudget}
                onChangeBathrooms={onChangeBathrooms}
                onChangeRooms={onChangeRooms}
                onChangeArea={onChangeArea}
              />
            </div>
            <div className={styles.results}>
              <Map className={styles.map} center={position} zoom={10}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {Properties.properties.map((item, idx) => {
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
              {Properties.properties.map((item, idx) => {
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
  }
}

export default withRouter(Search);
