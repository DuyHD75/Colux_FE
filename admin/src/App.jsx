
import './style.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "../src/router/router";
import PageWrapper from "../src/components/common/PageWrapper"
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>     
          {routes.map((route, index) => (
            route.index ? (
              <Route
                index
                key={index}
                element={route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>
                ) : route.element}
              />
            ) : (
              <Route
                path={route.path}
                key={index}
                element={route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>
                ) : route.element}
              />
            )
          ))}            
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
