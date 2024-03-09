import styles from "./Ticket.module.scss";
import airlineLogo from "../../assets/S7 Logo.svg";

interface PTicket {
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
}

const Ticket: React.FC<PTicket> = ({ price, segments }) => {
  const fromDuration = segments[0].duration;
  const dateFrom = new Date(segments[0].date);

  const toDuration = segments[1].duration;
  const dateTo = new Date(segments[1].date);

  const fromTransfers = segments[0].stops;
  const toTransfers = segments[1].stops;

  function priceFormat(initialPrice: number, thousandsLength: number) {
    const formatPriceThousands = initialPrice
      .toString()
      .split("")
      .slice(0, thousandsLength)
      .join("");
    const formatPriceHundreds = initialPrice
      .toString()
      .split("")
      .slice(thousandsLength, initialPrice.toString().length)
      .join("");
    return formatPriceThousands + " " + formatPriceHundreds;
  }

  function formattedPrice() {
    if (price.toString().length === 4) {
      return priceFormat(price, 1);
    } else if (price.toString().length === 5) {
      return priceFormat(price, 2);
    } else {
      return priceFormat(price, 3);
    }
  }

  function flightTransfers(stopsArray: string[]) {
    if (stopsArray.length === 0) {
      return "БЕЗ ПЕРЕСАДОК";
    } else if (stopsArray.length === 1) {
      return "1 ПЕРЕСАДКА";
    }

    return `${stopsArray.length} ПЕРЕСАДКИ`;
  }

  function formatTime(time: number) {
    return time < 10 ? "0" + time : time;
  }

  function findTimeDuration(durationInMinutes: number) {
    const fromDurationHours = Math.floor(durationInMinutes / 60);
    const fromDurationMinutes = durationInMinutes - fromDurationHours * 60;

    return `${fromDurationHours}ч ${fromDurationMinutes}м`;
  }

  function findTime(date: Date, durationInMinutes: number) {
    const fromHours = formatTime(date.getHours());
    const fromMinutes = formatTime(date.getMinutes());
    const fromTime = fromHours + ":" + fromMinutes;

    const fromTimestamp = date.getTime();

    const toTimeDate = new Date(fromTimestamp + durationInMinutes * 60000);
    const toHours = formatTime(toTimeDate.getHours());
    const toMinutes = formatTime(toTimeDate.getMinutes());
    const toTime = toHours + ":" + toMinutes;

    return [fromTime, toTime];
  }

  return (
    <li className={styles.ticket}>
      <header className={styles.header}>
        <p className={styles.price}>{formattedPrice()} Р</p>
        <img
          className={styles.airline_logo}
          src={airlineLogo}
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
