import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useEffect } from "react";
import { firstBy } from "thenby";
import TicketsList from "../components/TicketsList/TicketsList";

import {
  fetchSearchId,
  fetchGetTickets,
} from "../store/asyncActions/ticketActions";
import * as asyncActions from "../store/asyncActions/ticketActions";
import * as filterActions from "../store/actions/filterActions";
import * as sortActions from "../store/actions/sortActions";

const VisibleTicketsList: React.FC = (props: any) => {
  const { filters, tickets, sort, areTicketsLoaded } = props;
  const { all, withoutTransfer, oneTransfer, twoTransfers, threeTransfers } =
    filters;
  const { cheap, fast, optimal } = sort;
  const dispatch: Function = useDispatch();

  useEffect(() => {
    if (tickets.length === 0) {
      const fetchData = async () => {
        const resId = await dispatch(fetchSearchId());
        dispatch(fetchGetTickets(resId));
      };

      fetchData();
    }
  }, []);

  const getVisibleTickets = () => {
    const filterAndSortTickets = (length: number | null) => {
      const filteredTickets =
        length === null
          ? tickets
          : tickets.filter(
              (element: any) =>
                element.segments[0].stops.length === length ||
                element.segments[1].stops.length === length,
            );
      if (cheap) {
        return filteredTickets.sort((a: any, b: any) => a.price - b.price);
      } else if (fast) {
        return filteredTickets.sort(
          (a: any, b: any) =>
            a.segments[0].duration +
            a.segments[1].duration -
            (b.segments[0].duration + b.segments[1].duration),
        );
      } else if (optimal) {
        return filteredTickets.sort(
          firstBy(function (v1: any, v2: any) {
            return v1.segments[0].duration - v2.segments[0].duration;
          }).thenBy(function (v1: any, v2: any) {
            return v1.price - v2.price;
          }),
        );
      }
    };

    if (all) {
      return filterAndSortTickets(null);
    } else if (withoutTransfer) {
      return filterAndSortTickets(0);
    } else if (oneTransfer) {
      return filterAndSortTickets(1);
    } else if (twoTransfers) {
      return filterAndSortTickets(2);
    } else if (threeTransfers) {
      return filterAndSortTickets(3);
    } else {
      return tickets;
    }
  };

  const elements = getVisibleTickets();

  return (
    <TicketsList
      {...filters}
      processedTickets={[...elements]}
      areTicketsLoaded={areTicketsLoaded}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    areTicketsLoaded: state.tickets.areTicketsLoaded,
    tickets: state.tickets.tickets,
    filters: state.filter.filters,
    sort: state.sort.sort,
  };
};

export default connect(mapStateToProps, {
  ...asyncActions,
  ...filterActions,
  ...sortActions,
})(VisibleTicketsList);
