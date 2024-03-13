import Ticket from "../components/Ticket/Ticket";

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

const TicketContainer: React.FC<TProps> = ({ price, segments, carrier }) => {
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
    <Ticket
      price={price}
      segments={segments}
      carrier={carrier}
      formattedPrice={formattedPrice}
      flightTransfers={flightTransfers}
      findTimeDuration={findTimeDuration}
      findTime={findTime}
    />
  );
};

export default TicketContainer;
