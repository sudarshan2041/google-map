import { apicall } from "../../utils/ApiCall";

export const cordinatesData = ({ lat, lng }) => {
  return async (dispatch) => {
    try {
      let res = await apicall.request(
        "get",
        `geocode/json?latlng=${lat},${lng}&key=AIzaSyC68H9SdF9KiJWStgwPugHIgY_IILwefRo`,
        null,
        false
      );
      dispatch({
        type: "LATLNG_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "LATLNG_FAILED",
        payload: error,
      });
    }
  };
};
