type TProps = {
  id: string;
  tickets: string[];
};

export const ticketReducer = (
  state: TProps = { id: "0", tickets: [] },
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case "SEARCH_ID":
      return { ...state, id: action.payload };
    case "GET_TICKETS":
      return { ...state, tickets: [...state.tickets, ...action.payload] };
    case "ARE_TICKETS_LOADED":
      return { ...state, areTicketsLoaded: action.payload };
    default:
      return state;
  }
};
