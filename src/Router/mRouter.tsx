import MainApp from "../mainApp.tsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import MySpinner from "../Components/UI/mySpinner.tsx";

const ErrorPage = lazy(() => import("../Components/Layouts/errorPage.tsx"));

const Valantis = lazy(() => import("../Components/Layouts/valantis.tsx"));
const TestPage = lazy(() => import("../Components/Layouts/testPage.tsx"));
const Content = lazy(() => import("../Components/Layouts/content.tsx"));

function MyHashRouter() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={<MainApp />}
          errorElement={
            <Suspense fallback={<MySpinner />}>
              <ErrorPage />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<MySpinner />}>
                <TestPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="about"
            element={
              <Suspense fallback={<MySpinner />}>
                <Valantis />
              </Suspense>
            }
          ></Route>
          <Route
            path="production"
            element={
              <Suspense fallback={<MySpinner />}>
                <Content />
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default MyHashRouter;
