import styles from "./Ticket.module.scss";

type TPropsFunctions = {
  formattedPrice: () => string;
  flightTransfers: (stopsArray: string[]) => string;
  findTimeDuration: (durationInMinutes: number) => string;
  findTime: (date: Date, durationInMinutes: number) => string[];
};

type TPropsTicket = {
  price: number;
  carrier: string;
  segments: [
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
  ];
};

type TProps = TPropsFunctions & TPropsTicket;

const Ticket: React.FC<TProps> = ({
  segments,
  carrier,
  findTime,
  findTimeDuration,
  flightTransfers,
  formattedPrice,
}) => {
  const fromDuration = segments[0].duration;
  const dateFrom = new Date(segments[0].date);

  const toDuration = segments[1].duration;
  const dateTo = new Date(segments[1].date);

  const fromTransfers = segments[0].stops;
  const toTransfers = segments[1].stops;

  return (
    <li className={styles.ticket}>
      <header className={styles.header}>
        <p className={styles.price}>{formattedPrice()} Р</p>
        <img
          className={styles.airline_logo}
          src={`https://pics.avs.io/99/36/${carrier}.png`}
          alt="airline logo"
        />
      </header>
      <ul className={styles.info_list}>
        <li className={styles.info}>
          <div className={styles.time}>
            <p>
              {segments[0].origin} - {segments[0].destination}
            </p>
            <p>
              {findTime(dateFrom, fromDuration)[0]} -{" "}
              {findTime(dateFrom, fromDuration)[1]}
            </p>
          </div>
          <div className={styles.duration}>
            <p>В ПУТИ</p>
            <p>{findTimeDuration(fromDuration)}</p>
          </div>
          <div className={styles.transfers}>
            <p>{flightTransfers(fromTransfers)}</p>
            <p>{fromTransfers.join(", ")}</p>
          </div>
        </li>
        <li className={styles.info}>
          <div className={styles.time}>
            <p>
              {segments[1].origin} - {segments[1].destination}
            </p>
            <p>
              {findTime(dateTo, toDuration)[0]} -{" "}
              {findTime(dateTo, toDuration)[1]}
            </p>
          </div>
          <div className={styles.duration}>
            <p>В ПУТИ</p>
            <p>{findTimeDuration(toDuration)}</p>
          </div>
          <div className={styles.transfers}>
            <p>{flightTransfers(toTransfers)}</p>
            <p>{toTransfers.join(", ")}</p>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default Ticket;
