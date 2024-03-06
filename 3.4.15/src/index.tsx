import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import "normalize.css";
import "./index.scss";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducers/reducers";

const store = createStore(reducer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
