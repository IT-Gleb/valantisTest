import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { BASE_URL, BaseLink, aboutLink, testLink } from "../lib";
import { Suspense, lazy } from "react";
import MySpinner from "../Components/UI/mySpinner";

const ThisApp = lazy(() => import("../mainApp"));
const Production = lazy(
  () => import(BASE_URL + "src/Components/Layouts/content")
);
const About = lazy(() => import(BASE_URL + "src/Components/Layouts/valantis"));
const Test = lazy(() => import(BASE_URL + "src/Components/Layouts/testPage"));
const ErrPage = lazy(
  () => import(BASE_URL + "src/Components/Layouts/errorPage")
);

export const MyHashRouter = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<MySpinner></MySpinner>}>
        <ThisApp></ThisApp>
      </Suspense>
    ),
    errorElement: <ErrPage />,
    children: [
      {
        path: BaseLink,
        element: (
          <Suspense fallback={<MySpinner></MySpinner>}>
            <Production />
          </Suspense>
        ),
      },
      {
        path: testLink,
        element: (
          <Suspense fallback={<MySpinner />}>
            <Test />
          </Suspense>
        ),
      },
      {
        index: true,
        path: aboutLink,
        element: (
          <Suspense fallback={<MySpinner />}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);

const main_router = createBrowserRouter([
  {
    path: BaseLink,
    element: (
      <Suspense fallback={<MySpinner></MySpinner>}>
        <ThisApp></ThisApp>
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<MySpinner></MySpinner>}>
        <ErrPage></ErrPage>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<MySpinner></MySpinner>}>
            <Production></Production>
          </Suspense>
        ),
      },
      {
        path: testLink,
        element: (
          <Suspense fallback={<MySpinner></MySpinner>}>
            <Test></Test>
          </Suspense>
        ),
      },
      {
        path: aboutLink,
        element: (
          <Suspense fallback={<MySpinner></MySpinner>}>
            <About></About>
          </Suspense>
        ),
      },
    ],
  },
]);

export default main_router;
