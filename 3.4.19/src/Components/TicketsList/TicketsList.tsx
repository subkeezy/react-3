import Ticket from "../Ticket/Ticket";
import styles from "./TicketsList.module.scss";
import {
  fetchSearchId,
  fetchGetTickets,
} from "../../store/asyncActions/ActionTickets";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { useEffect, useId } from "react";
import * as asyncActions from "../../store/asyncActions/ActionTickets";

const TicketsList: React.FC = () => {
  const dispatch: any = useDispatch();
  const tickets = useSelector((state: any) => state.tickets.tickets);
  const id = useId();

  useEffect(() => {
    const fetchData = async () => {
      const resId = await dispatch(fetchSearchId());
      dispatch(fetchGetTickets(resId));
    };

    fetchData();
  }, [dispatch]);

  const elements = tickets.map((el: any) => {
    const { ...props } = el;
    return <Ticket key={id} {...props} />;
  });

  return (
    <>
      <ul className={styles.list}>{elements}</ul>
      <button className={styles.more_btn}>Показать еще 5 билетов!</button>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    searchId: state.tickets.id,
    tickets: state.tickets.tickets,
  };
};
export default connect(mapStateToProps, asyncActions)(TicketsList);
