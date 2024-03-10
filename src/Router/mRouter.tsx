import { createBrowserRouter } from "react-router-dom";
import { BASE_URL, BaseLink, aboutLink, testLink } from "../lib";
import { Suspense, lazy } from "react";
import MySpinner from "../Components/UI/mySpinner";

const ThisApp = lazy(() => import(BASE_URL + "src/mainApp"));
const Production = lazy(
  () => import(BASE_URL + "src/Components/Layouts/content")
);
const About = lazy(() => import(BASE_URL + "src/Components/Layouts/valantis"));
const Test = lazy(() => import(BASE_URL + "src/Components/Layouts/testPage"));
const ErrPage = lazy(
  () => import(BASE_URL + "src/Components/Layouts/errorPage")
);

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
