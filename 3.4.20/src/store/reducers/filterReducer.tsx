type TInitialState = {
  filters: {
    all: boolean;
    withoutTransfer: boolean;
    oneTransfer: boolean;
    twoTransfers: boolean;
    threeTransfers: boolean;
    restChecked: boolean;
  };
};

const initialState: TInitialState = {
  filters: {
    all: true,
    withoutTransfer: true,
    oneTransfer: true,
    twoTransfers: true,
    threeTransfers: true,
    restChecked: true,
  },
};

const filterReducer = (
  state: TInitialState = initialState,
  action: { type: string; payload: TInitialState },
) => {
  const { all, withoutTransfer, oneTransfer, twoTransfers, threeTransfers } =
    state.filters;
  switch (action.type) {
    case "FILTER_ALL_CHECKED":
      return {
        filters: {
          ...state.filters,
          all: !all,
          withoutTransfer: !all,
          oneTransfer: !all,
          twoTransfers: !all,
          threeTransfers: !all,
        },
      };
    case "FILTER_WITHOUT_TRANSFERS_CHECKED":
      return {
        filters: {
          ...state.filters,
          all: false,
          withoutTransfer: !withoutTransfer,
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
          all: withoutTransfer && oneTransfer && twoTransfers && threeTransfers,
        },
      };
    default:
      return state;
  }
};

export default filterReducer;
