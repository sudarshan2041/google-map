const initialState = {
  nearByisLoading: true,
  nearByBanks: null,
  error: null,
};
const nearByData = (state = initialState, action) => {
  switch (action.type) {
    case "NEAR_BY_DATA":
      return {
        ...state,
        ...action.payload,
        nearByisLoading: true,
      };
    case "NEAR_BY_SUCCESS":
      return {
        ...state,
        nearByBanks: action.payload,
        nearByisLoading: false,
      };
    case "NEAR_BY_FAILED":
      return {
        ...state,
        nearByisLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default nearByData;
