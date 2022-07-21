const initialState = {
  isLoading: true,
  data: null,
  error: null,
};
const cordinatesData = (state = initialState, action) => {
  switch (action.type) {
    case "LATLNG_DATA":
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      };
    case "LATLNG_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case "LATLNG_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default cordinatesData;
