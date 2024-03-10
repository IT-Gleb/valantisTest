import { NavLink } from "react-router-dom";
import { BaseLink, testLink, aboutLink } from "../../lib";

function MainMenu() {
  return (
    <nav className="w-[100%] bg-slate-700 text-slate-100 p-1" role="navigation">
      <ul
        className="w-[60%] mx-auto flex items-center justify-end gap-x-4 lg:gap-x-10 uppercase font-bold"
        role="menu"
      >
        <li className="cursor-pointer p-1">
          <NavLink
            to={BaseLink}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-slate-200"
                : isPending
                ? "text-slate-500"
                : "text-slate-400"
            }
            end
          >
            {" "}
            Продукция
          </NavLink>
        </li>
        <li className="cursor-pointer p-1">
          <NavLink
            to={testLink}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-slate-200"
                : isPending
                ? "text-slate-500"
                : "text-slate-400"
            }
          >
            {" "}
            Задание
          </NavLink>
        </li>
        <li className="cursor-pointer p-1 overflow-hidden whitespace-nowrap">
          <NavLink
            to={aboutLink}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-slate-200"
                : isPending
                ? "text-slate-500"
                : "text-slate-400"
            }
          >
            {" "}
            О нас
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainMenu;
