type TProps = {
  id: string;
  tickets: string[];
  areTicketsLoaded: boolean;
};

export const addGetTickets = (payload: TProps) => ({
  type: "GET_TICKETS",
  payload,
});
export const addSearchId = (payload: TProps) => ({
  type: "SEARCH_ID",
  payload,
});

export const addAreTicketsLoaded = (payload: TProps) => ({
  type: "ARE_TICKETS_LOADED",
  payload,
});

export const fetchSearchId = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        "https://aviasales-test-api.kata.academy/search",
      );
      if (response.ok) {
        const json = await response.json();
        const searchId = json.searchId;
        dispatch(addSearchId(searchId));
        return searchId;
      } else {
        throw new Error("Error fetching searchId:");
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchGetTickets = (id: any) => {
  return async (dispatch: any) => {
    let stop = false;
    while (!stop) {
      try {
        const response = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`,
        );
        if (response.ok) {
          const json = await response.json();
          await dispatch(addGetTickets(json.tickets));
          await dispatch(addAreTicketsLoaded(json.stop));
          stop = json.stop;
        } else {
          throw new Error("Error fetching tickets");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
};
