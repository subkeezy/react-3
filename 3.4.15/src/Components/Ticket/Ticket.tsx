import styles from "./Ticket.module.scss";
import airlineLogo from "../../assets/S7 Logo.svg";

const Ticket: React.FC = () => {
  return (
    <li className={styles.ticket}>
      <header className={styles.header}>
        <p className={styles.price}>13 400 Р</p>
        <img
          className={styles.airline_logo}
          src={airlineLogo}
          alt="airline logo"
        />
      </header>
      <ul className={styles.info_list}>
        <li className={styles.info}>
          <div className={styles.time}>
            <p>MOW - HKT</p>
            <p>10:45 - 8:00</p>
          </div>
          <div className={styles.duration}>
            <p>В ПУТИ</p>
            <p>21ч 15м</p>
          </div>
          <div className={styles.transfers}>
            <p>2 ПЕРЕСАДКИ</p>
            <p>HKG, JNB</p>
          </div>
        </li>
        <li className={styles.info}>
          <div className={styles.time}>
            <p>MOW - HKT</p>
            <p>11:20 - 00:50</p>
          </div>
          <div className={styles.duration}>
            <p>В ПУТИ</p>
            <p>13ч 30м</p>
          </div>
          <div className={styles.transfers}>
            <p>1 ПЕРЕСАДКА</p>
            <p>HKG</p>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default Ticket;
