import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./assets/css/styles.css";
//import MainApp from "./mainApp.tsx";
import main_router from "./Router/mRouter.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={main_router}></RouterProvider>
);
//<MainApp />);
