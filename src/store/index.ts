import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { IPropertiesState, Properties } from "./properties/reducer";

export interface IAppState {
  Properties: IPropertiesState;
}

const appReducer = combineReducers({ Properties });

export const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const makeStore = (initialState: any, options: any) => {
  return createStore(appReducer, composeWithDevTools());
};
