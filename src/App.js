import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store";

import AppLayout from "./layouts/App";

function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}

export default App;
