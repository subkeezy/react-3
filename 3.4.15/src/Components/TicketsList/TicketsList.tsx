import Ticket from "../Ticket/Ticket";
import styles from "./TicketsList.module.scss";

const TicketsList: React.FC = () => {
  return (
    <ul className={styles.list}>
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <button className={styles.more_btn}>Показать еще 5 билетов!</button>
    </ul>
  );
};

export default TicketsList;
