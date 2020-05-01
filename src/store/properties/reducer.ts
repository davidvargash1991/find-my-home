import { Action } from "./actions";
import { PropertiesActionType } from "./actionTypes";
import { cities, types, operations, properties, IProperty, ICity } from "data";
import { IDropdownOption } from "components/ui/dropdown";

export interface IFilters {
  budget: { min: number; max: number };
  pricesRange: { min: number; max: number };
  bathrooms: { amount: number; selected: boolean }[];
  rooms: { amount: number; selected: boolean }[];
  area: { min: number; max: number };
  areaRange: { min: number; max: number };
  parking: boolean;
  city: string;
  operation: string;
  propertyType: string;
}

export interface IPropertiesState {
  isLoading: boolean;
  properties: IProperty[];
  filters: IFilters;
  types: IDropdownOption[];
  operations: IDropdownOption[];
  cities: ICity[];
}

const propertiesInitialState: IPropertiesState = {
  isLoading: true,
  properties,
  filters: {
    budget: { min: 0, max: 0 },
    pricesRange: { min: 0, max: 0 },
    bathrooms: [],
    rooms: [],
    area: { min: 0, max: 0 },
    areaRange: { min: 0, max: 0 },
    parking: false,
    city: "",
    operation: "",
    propertyType: "",
  },
  types,
  operations: operations,
  cities,
};

const filters = (state: IFilters, action: Action, newData?: any) => {
  switch (action.type) {
    case PropertiesActionType.CHANGE_BUDGET:
      return { ...state, budget: action.budget };
    case PropertiesActionType.CHANGE_BATHROOMS:
      return { ...state, bathrooms: newData };
    case PropertiesActionType.CHANGE_ROOMS:
      return { ...state, rooms: newData };
    case PropertiesActionType.CHANGE_AREA:
      return { ...state, area: action.area };
    case PropertiesActionType.CHANGE_PARKING:
      return { ...state, parking: action.parking };
    default:
      return state;
  }
};

const realEstate = (filters: IFilters) => {
  const priceFilter = filters.operation === "BY" ? "buyPrice" : "rentPrice";
  return properties.filter(
    (property) =>
      property.city === filters.city &&
      property.type === filters.propertyType &&
      property.operations.find((op) => op === filters.operation) &&
      property[priceFilter] >= filters.budget.min &&
      property[priceFilter] <= filters.budget.max &&
      filters.bathrooms
        .filter((item) => item.selected)
        .find((item) => item.amount === property.bathrooms) !== undefined &&
      filters.rooms
        .filter((item) => item.selected)
        .find((item) => item.amount === property.rooms) !== undefined &&
      property.area >= filters.area.min &&
      property.area <= filters.area.max &&
      property.parking === filters.parking
  );
};

export const Properties = (state = propertiesInitialState, action: Action) => {
  let newFilters = propertiesInitialState.filters;
  switch (action.type) {
    case PropertiesActionType.PROPERTIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PropertiesActionType.PROPERTIES_READY:
      return {
        ...state,
        properties: action.data,
        filters: action.filters,
        isLoading: false,
      };
    case PropertiesActionType.CHANGE_BUDGET:
      newFilters = filters(state.filters, action);
      return {
        ...state,
        properties: realEstate(newFilters),
        filters: newFilters,
        isLoading: false,
      };
    case PropertiesActionType.CHANGE_BATHROOMS:
      const newBathrooms = state.filters.bathrooms.map((bath) => {
        if (bath.amount === action.item.amount) {
          return action.item;
        } else {
          return bath;
        }
      });
      newFilters = filters(state.filters, action, newBathrooms);
      return {
        ...state,
        properties: realEstate(newFilters),
        filters: newFilters,
        isLoading: false,
      };
    case PropertiesActionType.CHANGE_ROOMS:
      const newRooms = state.filters.rooms.map((room) => {
        if (room.amount === action.item.amount) {
          return action.item;
        } else {
          return room;
        }
      });
      newFilters = filters(state.filters, action, newRooms);
      return {
        ...state,
        properties: realEstate(newFilters),
        filters: newFilters,
        isLoading: false,
      };
    case PropertiesActionType.CHANGE_AREA:
      newFilters = filters(state.filters, action);
      return {
        ...state,
        properties: realEstate(newFilters),
        filters: newFilters,
        isLoading: false,
      };
    case PropertiesActionType.CHANGE_PARKING:
      newFilters = filters(state.filters, action);
      return {
        ...state,
        properties: realEstate(newFilters),
        filters: newFilters,
        isLoading: false,
      };
    default:
      return state;
  }
};
