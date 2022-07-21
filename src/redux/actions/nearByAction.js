import { apicall } from "../../utils/ApiCall";

export const nearByAction = ({ lat, lng }) => {
  return async (dispatch) => {
    try {
      let res = await apicall.request(
        "GET",
        `place/textsearch/json?location=${lat}%2C${lng}&radius=100&type=bank&query=Hdfc+bank&key=AIzaSyC68H9SdF9KiJWStgwPugHIgY_IILwefRo&libraries=places&callback=initMap`,
        null,
        false
      );
      dispatch({
        type: "NEAR_BY_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "NEAR_BY_FAILED",
        payload: error,
      });
    }
  };
};
