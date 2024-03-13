type TInitialState = {
  sort: {
    cheap: boolean;
    fast: boolean;
    optimal: boolean;
  };
};

const initialState: TInitialState = {
  sort: {
    cheap: true,
    fast: false,
    optimal: false,
  },
};

const filterReducer = (
  state: TInitialState = initialState,
  action: { type: string },
) => {
  switch (action.type) {
    case "SORT_CHEAP":
      return {
        sort: {
          cheap: true,
          fast: false,
          optimal: false,
        },
      };
    case "SORT_FAST":
      return {
        sort: {
          cheap: false,
          fast: true,
          optimal: false,
        },
      };
    case "SORT_OPTIMAL":
      return {
        sort: {
          cheap: false,
          fast: false,
          optimal: true,
        },
      };
    default:
      return state;
  }
};

export default filterReducer;
