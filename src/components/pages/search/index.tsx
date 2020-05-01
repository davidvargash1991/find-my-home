import React, { PureComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import styles from "./search.module.scss";
import cx from "classnames";
import Filters from "./filters";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Dropdown, { IDropdownOption } from "components/ui/dropdown";
import { IPropertiesState } from "store/properties/reducer";
import Result from "components/ui/result";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import filter from "images/filter.svg";
import search from "images/search.svg";
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
  onChangeParking: (parking: boolean) => void;
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
  private filtersRef = React.createRef<HTMLDivElement>();
  private searchRef = React.createRef<HTMLDivElement>();

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

  private handleFiltersClick = () => {
    let pos = -300;
    const frame = () => {
      if (this.filtersRef.current) {
        if (pos >= 0) {
          this.filtersRef.current.style.left = 0 + "px";
          document.body.style.overflow = "hidden";
        } else {
          pos = pos + 8;
          this.filtersRef.current.style.left = pos + "px";
          window.requestAnimationFrame(frame);
        }
      }
    };
    window.requestAnimationFrame(frame);
  };

  private handleCloseFiltersClick = () => {
    let pos = 0;
    const frame = () => {
      if (this.filtersRef.current) {
        if (pos <= -300) {
          this.filtersRef.current.style.left = "-300px";
          document.body.style.overflow = "auto";
        } else {
          pos = pos - 8;
          this.filtersRef.current.style.left = pos + "px";
          window.requestAnimationFrame(frame);
        }
      }
    };
    window.requestAnimationFrame(frame);
  };

  private handleSearchClick = () => {
    let pos = -300;
    const frame = () => {
      if (this.searchRef.current) {
        if (pos >= 0) {
          this.searchRef.current.style.right = 0 + "px";
          document.body.style.overflow = "hidden";
        } else {
          pos = pos + 8;
          this.searchRef.current.style.right = pos + "px";
          window.requestAnimationFrame(frame);
        }
      }
    };
    window.requestAnimationFrame(frame);
  };

  private handleCloseSearchClick = () => {
    let pos = 0;
    const frame = () => {
      if (this.searchRef.current) {
        if (pos <= -300) {
          this.searchRef.current.style.right = "-300px";
          document.body.style.overflow = "auto";
        } else {
          pos = pos - 8;
          this.searchRef.current.style.right = pos + "px";
          window.requestAnimationFrame(frame);
        }
      }
    };
    window.requestAnimationFrame(frame);
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
      onChangeParking,
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

    const myIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [24, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, 0],
      shadowUrl: markerIconShadow,
      shadowSize: [16, 16],
      shadowAnchor: [16, 16],
    });

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.paramsMobile}>
            <div
              className={styles.filterButton}
              onClick={this.handleFiltersClick}
            >
              <img className={styles.image} src={filter} alt="filter" />
              <p className={styles.text}>Filter</p>
            </div>
            <div
              className={styles.filterButton}
              onClick={this.handleSearchClick}
            >
              <img className={styles.image} src={search} alt="search" />
              <p className={styles.text}>Search</p>
            </div>
          </div>
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
            <div ref={this.searchRef} className={styles.searchMobile}>
              <div
                className={styles.close}
                onClick={this.handleCloseSearchClick}
              >
                X
              </div>
              <div className={styles.dropdown}>
                <Dropdown
                  placeholder="Select a city"
                  options={citiesDDL}
                  value={this.state.city}
                  onChange={this.handleCityChange}
                  width={200}
                />
              </div>
              <div className={styles.dropdown}>
                <Dropdown
                  placeholder="Select a home type"
                  options={Properties.types}
                  value={type}
                  onChange={this.handleTypeChange}
                  width={200}
                />
              </div>
              <div className={styles.dropdown}>
                <Dropdown
                  placeholder="I want to"
                  options={Properties.operations}
                  value={operation}
                  onChange={this.handleOperationChange}
                  width={200}
                />
              </div>
              <button
                className={styles.button}
                onClick={this.HandleSearchClick}
              >
                Search
              </button>
            </div>
            <div ref={this.filtersRef} className={styles.filters}>
              <h2 className={styles.title}>Filters</h2>
              <div
                className={styles.close}
                onClick={this.handleCloseFiltersClick}
              >
                X
              </div>
              <Filters
                Properties={Properties}
                onChangeBudget={onChangeBudget}
                onChangeBathrooms={onChangeBathrooms}
                onChangeRooms={onChangeRooms}
                onChangeArea={onChangeArea}
                onChangeParking={onChangeParking}
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
                    <Marker key={`M${idx}`} position={markerPos} icon={myIcon}>
                      <Popup>
                        <p className={styles.title}>{`$${
                          operation.value === "BY"
                            ? item.buyPrice
                            : item.rentPrice
                        }`}</p>
                        <br />
                        <div className={styles.trait}>
                          <p className={styles.title}>Bathrooms:</p>
                          <p className={styles.value}>{item.bathrooms}</p>
                        </div>
                        <div className={styles.trait}>
                          <p className={styles.title}>Rooms:</p>
                          <p className={styles.value}>{item.rooms}</p>
                        </div>
                        <div className={styles.trait}>
                          <p className={styles.title}>Area:</p>
                          <p className={styles.value}>{item.area}</p>
                        </div>
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
