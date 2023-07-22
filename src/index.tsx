import { store } from "app/store";
import ThemeWrapper from "components/theme/ThemeWrapper";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "reportWebVitals";
import router from "routes/router";
import "styles/app.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      {/* material theme wrapper starts */}
      <ThemeWrapper>
        <RouterProvider router={router} />
      </ThemeWrapper>
      {/* material theme wrapper ends */}

      {/* toastify wrapper starts */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        draggable={false}
      />
      {/* toastify wrapper ends */}
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
