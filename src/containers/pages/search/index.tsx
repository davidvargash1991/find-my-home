import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "store";
import {
  fetchResults,
  changeBudget,
  changeBathrooms,
  changeRooms,
  changeArea,
  changeParking,
} from "store/properties/actions";
import Search from "components/pages/search";

const mapStateToProps = (state: IAppState) => ({
  Properties: state.Properties,
});

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onGetSearchResults: (
      city: string,
      propertyType: string,
      operation: string
    ) => dispatch(fetchResults(city, propertyType, operation)),
    onChangeBudget: (budget: { min: number; max: number }) =>
      dispatch(changeBudget(budget)),
    onChangeBathrooms: (item: { amount: number; selected: boolean }) =>
      dispatch(changeBathrooms(item)),
    onChangeRooms: (item: { amount: number; selected: boolean }) =>
      dispatch(changeRooms(item)),
    onChangeArea: (budget: { min: number; max: number }) =>
      dispatch(changeArea(budget)),
    onChangeParking: (parking: boolean) => dispatch(changeParking(parking)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
