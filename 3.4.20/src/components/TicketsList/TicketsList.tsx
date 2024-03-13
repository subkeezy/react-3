import TicketContainer from "../../containers/TicketContainer";
import styles from "./TicketsList.module.scss";
import { connect } from "react-redux";
import { useState } from "react";
import * as asyncActions from "../../store/asyncActions/ticketActions";
import * as filterActions from "../../store/actions/filterActions";
import * as sortActions from "../../store/actions/sortActions";
import { BarLoader } from "react-spinners";

const TicketsList: React.FC = (props: any) => {
  const {
    all,
    withoutTransfer,
    oneTransfer,
    twoTransfers,
    threeTransfers,
    processedTickets,
    areTicketsLoaded,
  } = props;
  const [currentTicketsCount, setCurrentTicketsCount] = useState(5);

  const areLoaded = areTicketsLoaded ? null : (
    <div className={styles.loader}>
      <BarLoader height={7} width={"100%"} color="#2196F3" />
    </div>
  );

  const isNoFiltersChecked =
    !withoutTransfer && !all && !oneTransfer && !twoTransfers && !threeTransfers
      ? true
      : false;

  console.log(isNoFiltersChecked);

  function handleLoadMoreTickets() {
    setCurrentTicketsCount(currentTicketsCount + 5);
  }

  const elements = processedTickets
    .slice(0, currentTicketsCount)
    .map((el: any, index: number) => {
      const { ...elProps } = el;
      return <TicketContainer key={index} {...elProps} />;
    });

  return (
    <>
      {areLoaded}
      <ul className={styles.list}>
        {isNoFiltersChecked ? (
          <div>Рейсов, подходящих под заданные фильтры, не найдено</div>
        ) : (
          elements
        )}
      </ul>
      {isNoFiltersChecked || elements.length === 0 ? null : (
        <button
          className={styles.more_btn}
          onClick={() => handleLoadMoreTickets()}
        >
          Показать еще 5 билетов!
        </button>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    searchId: state.tickets.id,
    tickets: state.tickets.tickets,
    filters: state.filter.filters,
    sort: state.sort.sort,
  };
};

export default connect(mapStateToProps, {
  ...asyncActions,
  ...filterActions,
  ...sortActions,
})(TicketsList);
