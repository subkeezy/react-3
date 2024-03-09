const SEARCH_ID = "SEARCH_ID";
const GET_TICKETS = "GET_TICKETS";

type TProps = {
  id: string;
  tickets: string[];
};

export const ticketReducer = (
  state: TProps = { id: "0", tickets: [] },
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SEARCH_ID:
      return { ...state, id: action.payload };
    case GET_TICKETS:
      return { ...state, tickets: action.payload };
    default:
      return state;
  }
};

export const addGetTickets = (payload: TProps) => ({
  type: GET_TICKETS,
  payload,
});
export const addSearchId = (payload: TProps) => ({ type: SEARCH_ID, payload });
