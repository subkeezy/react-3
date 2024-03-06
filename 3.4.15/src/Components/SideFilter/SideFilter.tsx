import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import styles from "./SideFilter.module.scss";

type TStateProps = {
  checked: {
    all: boolean;
    noTransfer: boolean;
    oneTransfer: boolean;
    twoTransfers: boolean;
    threeTransfers: boolean;
  };
};

type TDispatchProps = {
  filterAllChecked: () => void;
  filterNoChecked: () => void;
  filterOneChecked: () => void;
  filterTwoChecked: () => void;
  filterThreeChecked: () => void;
  filterOthersChecked: () => void;
};

type TProps = TStateProps & TDispatchProps;

const SideFilter: React.FC<TProps> = ({
  checked,
  filterAllChecked,
  filterNoChecked,
  filterOneChecked,
  filterTwoChecked,
  filterThreeChecked,
  filterOthersChecked,
}) => {
  const handleFilterChange = (filterType: string) => {
    switch (filterType) {
      case "all":
        filterAllChecked();
        break;
      case "noTransfer":
        filterNoChecked();
        filterOthersChecked();
        break;
      case "oneTransfer":
        filterOneChecked();
        filterOthersChecked();
        break;
      case "twoTransfers":
        filterTwoChecked();
        filterOthersChecked();
        break;
      case "threeTransfers":
        filterThreeChecked();
        filterOthersChecked();
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
      <ul className={styles.transfers_list}>
        <li className={styles.transfer}>
          <input
            type="checkbox"
            id="all"
            onChange={() => handleFilterChange("all")}
            checked={checked.all}
          />
          <label htmlFor="all">Все</label>
        </li>
        <li className={styles.transfer}>
          <input
            type="checkbox"
            id="no-transfer"
            checked={checked.noTransfer}
            onChange={() => handleFilterChange("noTransfer")}
          />
          <label htmlFor="no-transfer">Без пересадок</label>
        </li>
        <li className={styles.transfer}>
          <input
            type="checkbox"
            id="one-transfer"
            checked={checked.oneTransfer}
            onChange={() => handleFilterChange("oneTransfer")}
          />
          <label htmlFor="one-transfer">1 пересадка</label>
        </li>
        <li className={styles.transfer}>
          <input
            type="checkbox"
            id="two-transfers"
            checked={checked.twoTransfers}
            onChange={() => handleFilterChange("twoTransfers")}
          />
          <label htmlFor="two-transfers">2 пересадки</label>
        </li>
        <li className={styles.transfer}>
          <input
            type="checkbox"
            id="three-transfers"
            checked={checked.threeTransfers}
            onChange={() => handleFilterChange("threeTransfers")}
          />
          <label htmlFor="three-transfers">3 пересадки</label>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    checked: state.filters,
  };
};

export default connect(mapStateToProps, actions)(SideFilter);
