import ReactDOM from "react-dom/client";
//import { RouterProvider } from "react-router-dom";

import "./assets/css/styles.css";
import MainApp from "./mainApp.tsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./Components/Layouts/errorPage.tsx";
import Valantis from "./Components/Layouts/valantis.tsx";
import TestPage from "./Components/Layouts/testPage.tsx";
import Content from "./Components/Layouts/content.tsx";

//import { MyHashRouter } from "./Router/mRouter.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter basename="/">
    <Routes>
      <Route path="/" element={<MainApp />} errorElement={<ErrorPage />}>
        <Route path="/" element={<TestPage />}></Route>
        <Route path="about" element={<Valantis />}></Route>
        <Route path="production" element={<Content />}></Route>
      </Route>
    </Routes>
  </HashRouter>
  //<MainApp/>
);
