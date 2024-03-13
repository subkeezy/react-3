import styles from "./SuggestionsTabs.module.scss";
import React from "react";
import { useState } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import * as sortActions from "../../store/actions/sortActions";

const SuggestionsFilter: React.FC = (props: any) => {
  const { sortCheap, sortFast, sortOptimal } = props;
  const [pressedButton, setPressedButton] = useState("cheapestBtn");

  const btnActive = (button: string) =>
    classNames({
      [`${styles.button_active}`]: button === pressedButton,
    });

  const handleSortTickets = (sortType: string) => {
    switch (sortType) {
      case "cheap":
        sortCheap();
        break;
      case "fast":
        sortFast();
        break;
      case "optimal":
        sortOptimal();
        break;
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${btnActive("cheapestBtn")}`}
        onClick={() => {
          setPressedButton("cheapestBtn");
          handleSortTickets("cheap");
        }}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`${styles.button} ${btnActive("fastestBtn")}`}
        onClick={() => {
          setPressedButton("fastestBtn");
          handleSortTickets("fast");
        }}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={`${styles.button} ${btnActive("optimalBtn")}`}
        onClick={() => {
          setPressedButton("optimalBtn");
          handleSortTickets("optimal");
        }}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tickets: state.tickets.tickets,
    sort: state.sort.sort,
  };
};

export default connect(mapStateToProps, sortActions)(SuggestionsFilter);
