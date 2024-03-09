import { addSearchId } from "../reducers/ticketReducer";
import { addGetTickets } from "../reducers/ticketReducer";

export const fetchSearchId = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        "https://aviasales-test-api.kata.academy/search",
      );
      const json = await response.json();
      const searchId = json.searchId;
      dispatch(addSearchId(searchId));
      return searchId;
    } catch (error) {
      console.error("Error fetching searchId:", error);
    }
  };
};

export const fetchGetTickets = (id: any) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`,
      );
      const json = await response.json();
      dispatch(addGetTickets(json.tickets.slice(0, 5)));
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
};
