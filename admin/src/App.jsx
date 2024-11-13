import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import routes from "./router/router";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import { ColorModeProvider } from './theme/ColorModeContext';
import Auth from './page/Auth';

function App() {
  return (
    <ColorModeProvider>
      <ToastContainer />
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Auth />} />
        {routes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </ColorModeProvider>
  );
}

export default App;
