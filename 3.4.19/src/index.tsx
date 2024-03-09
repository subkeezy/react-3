import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import "normalize.css";
import "./index.scss";

import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { Provider } from "react-redux";
import filterReducer from "./store/reducers/filterReducer";
import { ticketReducer } from "./store/reducers/ticketReducer";
import { logger } from "./store/middleware/logger";
import { thunk } from "redux-thunk";

type TReducers = {
  filter: any;
  tickets: any;
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducer = combineReducers<TReducers>({
  filter: filterReducer,
  tickets: ticketReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk)),
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
