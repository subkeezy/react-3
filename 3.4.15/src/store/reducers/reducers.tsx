type TInitialState = {
  filters: {
    all: boolean;
    noTransfer: boolean;
    oneTransfer: boolean;
    twoTransfers: boolean;
    threeTransfers: boolean;
    restChecked: boolean;
  };
};

const initialState: TInitialState = {
  filters: {
    all: false,
    noTransfer: false,
    oneTransfer: false,
    twoTransfers: false,
    threeTransfers: false,
    restChecked: false,
  },
};

const reducer = (
  state: TInitialState = initialState,
  action: { type: string },
) => {
  const { all, noTransfer, oneTransfer, twoTransfers, threeTransfers } =
    state.filters;
  switch (action.type) {
    case "FILTER_ALL_CHECKED":
      return {
        filters: {
          ...state.filters,
          all: !all,
          noTransfer: !all,
          oneTransfer: !all,
          twoTransfers: !all,
          threeTransfers: !all,
        },
      };
    case "FILTER_NO_CHECKED":
      return {
        filters: {
          ...state.filters,
          all: false,
          noTransfer: !noTransfer,
        },
      };
    case "FILTER_ONE_CHECKED":
      return {
        filters: {
          ...state.filters,
          all: false,
          oneTransfer: !oneTransfer,
        },
      };
    case "FILTER_TWO_CHECKED":
      return {
        filters: {
          ...state.filters,
          all: false,
          twoTransfers: !twoTransfers,
        },
      };
    case "FILTER_THREE_CHECKED":
      return {
        filters: {
          ...state.filters,
          all: false,
          threeTransfers: !threeTransfers,
        },
      };
    case "FILTER_OTHERS_CHECKED":
      return {
        filters: {
          ...state.filters,
          all: noTransfer && oneTransfer && twoTransfers && threeTransfers,
        },
      };

    default:
      return state;
  }
};

export default reducer;
