import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "../src/router/router";
import PageWrapper from "../src/components/common/PageWrapper";
import MainLayout from "./components/layout/MainLayout";
import i18n from "./i18n";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import store from './redux/store';
import { useDispatch, Provider } from 'react-redux';
import { useEffect } from "react";
import { setAdmin } from "./redux/reducer/adminSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      dispatch(setAdmin(JSON.parse(storedAdmin))); // Khôi phục thông tin admin
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <Route
                  index
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
