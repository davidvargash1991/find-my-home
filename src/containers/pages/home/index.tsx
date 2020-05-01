import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchResults } from "store/properties/actions";
import Home from "components/pages/home";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onGetSearchResults: (
      city: string,
      propertyType: string,
      operation: string
    ) => dispatch(fetchResults(city, propertyType, operation)),
  };
}

export default connect(null, mapDispatchToProps)(Home);
