import { Dispatch } from "redux";
import { PropertiesActionType } from "./actionTypes";
import { properties, IProperty } from "data";
import { IFilters } from "./reducer";

interface IPropertiesLoading {
  type: PropertiesActionType.PROPERTIES_LOADING;
}

interface IPropertiesReady {
  type: PropertiesActionType.PROPERTIES_READY;
  filters: IFilters;
  data: IProperty[];
}

interface IChangeBudget {
  type: PropertiesActionType.CHANGE_BUDGET;
  budget: { min: number; max: number };
}

interface IChangeBathrooms {
  type: PropertiesActionType.CHANGE_BATHROOMS;
  item: { amount: number; selected: boolean };
}

interface IChangeRooms {
  type: PropertiesActionType.CHANGE_ROOMS;
  item: { amount: number; selected: boolean };
}

interface IChangeArea {
  type: PropertiesActionType.CHANGE_AREA;
  area: { min: number; max: number };
}

interface IChangeParking {
  type: PropertiesActionType.CHANGE_PARKING;
  parking: boolean;
}

export type Action =
  | IPropertiesLoading
  | IPropertiesReady
  | IChangeBudget
  | IChangeBathrooms
  | IChangeRooms
  | IChangeArea
  | IChangeParking;

const propertiesLoading = () => ({
  type: PropertiesActionType.PROPERTIES_LOADING,
});

const propertiesReady = (filters: IFilters, data: IProperty[]) => ({
  type: PropertiesActionType.PROPERTIES_READY,
  filters,
  data,
});

export const changeBudget = (budget: { min: number; max: number }) => ({
  type: PropertiesActionType.CHANGE_BUDGET,
  budget,
});

export const changeBathrooms = (item: {
  amount: number;
  selected: boolean;
}) => ({
  type: PropertiesActionType.CHANGE_BATHROOMS,
  item,
});

export const changeRooms = (item: { amount: number; selected: boolean }) => ({
  type: PropertiesActionType.CHANGE_ROOMS,
  item,
});

export const changeArea = (area: { min: number; max: number }) => ({
  type: PropertiesActionType.CHANGE_AREA,
  area,
});

export const changeParking = (parking: boolean) => ({
  type: PropertiesActionType.CHANGE_PARKING,
  parking,
});

function onlyUnique(value: number, index: number, self: number[]) {
  return self.indexOf(value) === index;
}

export const fetchResults = (
  city: string,
  propertyType: string,
  operation: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(propertiesLoading());

    const data = properties.filter(
      (property) =>
        property.city === city &&
        property.type === propertyType &&
        property.operations.find((op) => op === operation)
    );

    let prices: number[] = [];
    let rooms: number[] = [];
    let areas: number[] = [];
    let bathrooms: number[] = [];

    if (operation === "BY") {
      prices = data.map((property) => {
        return property.buyPrice;
      });
    } else {
      prices = data.map((property) => {
        return property.rentPrice;
      });
    }

    data.forEach((property) => {
      if (operation === "BY") {
        prices.push(property.buyPrice);
      } else {
        prices.push(property.rentPrice);
      }

      rooms.push(property.rooms);

      areas.push(property.area);

      bathrooms.push(property.bathrooms);
    });

    const minPrice = Math.min.apply(null, prices);
    const maxPrice = Math.max.apply(null, prices);

    const minArea = Math.min.apply(null, areas);
    const maxArea = Math.max.apply(null, areas);

    const filters: IFilters = {
      budget: { min: minPrice, max: maxPrice },
      pricesRange: { min: minPrice, max: maxPrice },
      bathrooms: bathrooms
        .filter(onlyUnique)
        .map((item) => {
          return { amount: item, selected: true };
        })
        .sort(function (a, b) {
          return a.amount - b.amount;
        }),
      rooms: rooms
        .filter(onlyUnique)
        .map((item) => {
          return { amount: item, selected: true };
        })
        .sort(function (a, b) {
          return a.amount - b.amount;
        }),
      area: { min: minArea, max: maxArea },
      areaRange: { min: minArea, max: maxArea },
      parking: true,
      city,
      operation,
      propertyType,
    };

    dispatch(propertiesReady(filters, data));
  };
};
