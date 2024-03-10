import HeaderTop from "./Components/Layouts/headerTop";
import FooterMain from "./Components/Layouts/footerMain";
//import Content from "./Components/Layouts/content";
import { Outlet } from "react-router-dom";
import MainMenu from "./Components/menu/mainMenu";

function MainApp() {
  return (
    <>
      <HeaderTop>
        <div className="flex flex-col gap-y-2 md:flex-row items-start gap-x-1">
          <h1 className="hidden md:block whitespace-nowrap text-[4rem]/[4rem] -skew-x-12">
            VALANTIS STORE
          </h1>
          <div className="relative">
            <h1 className="  md:hidden text-[4rem]/[4rem] -skew-x-12">STORE</h1>
            <div
              className="block absolute md:hidden left-8 bottom-[2px] text-slate-800 font-medium text-[2.2rem]/[2.2rem]"
              style={{ textShadow: "yellow -2px -2px 4px, lime 2px 2px 4px" }}
            >
              VALANTIS
            </div>
          </div>
          <span>Тестовое задание</span>
          <span className="mt-auto ml-auto text-[0.65rem]/[0.8rem]">
            Верстка и программирование by Gleb Torgashin. (march 2024)
          </span>
        </div>
      </HeaderTop>
      <MainMenu></MainMenu>
      <main className="w-[96%] md:w-[90%] pl-3 xl:container flex-auto min-h-[80vh] mt-5">
        <Outlet></Outlet>
        {/* <Content></Content> */}
      </main>
      <FooterMain>
        <div className=" w-[100%] flex flex-col md:flex-row items-end gap-x-1 pt-2 ">
          <span className=" self-start mr-auto text-[0.65rem]/[0.8rem]">
            Верстка и программирование by Gleb Torgashin. (march 2024)
          </span>
          <span>Тестовое задание</span>
          <h1 className=" hidden md:inline-block whitespace-nowrap text-[4rem]/[4rem] -skew-x-12">
            VALANTIS STORE
          </h1>
          <div className="relative">
            <h1 className=" md:hidden text-[4rem]/[4rem] -skew-x-12">STORE</h1>
            <div
              className="block absolute md:hidden left-8 bottom-[2px] text-slate-800 font-medium text-[2.2rem]/[2.2rem]"
              style={{ textShadow: "yellow -2px -2px 4px, yellow 2px 2px 4px" }}
            >
              VALANTIS
            </div>
          </div>
        </div>
      </FooterMain>
    </>
  );
}

export default MainApp;
