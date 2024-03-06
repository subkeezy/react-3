import styles from "./SuggestionsTabs.module.scss";
import React from "react";

const SuggestionsFilter: React.FC = () => {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${styles.button_active}`}>
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button className={styles.button}>САМЫЙ БЫСТРЫЙ</button>
      <button className={styles.button}>ОПТИМАЛЬНЫЙ</button>
    </div>
  );
};

export default SuggestionsFilter;
