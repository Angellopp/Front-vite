"use client";

import { Drawer, Sidebar, TextInput } from "flowbite-react";
import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { HiChartPie, HiSearch, HiShoppingBag, HiUsers, HiAdjustments } from "react-icons/hi";
import MyNavbar from "./MyNavbar";
import { useLocation } from "react-router-dom";
import { ModalConfig } from "../modal/ModalConfig";

export default function MySidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfig, setIsOpenConfig] = useState(false);

  const handleClose = () => setIsOpen(false);
  const navigate = useNavigate();

  const goNavigate = (url) => {
    setIsOpen(false);
    navigate(url);
  };
  let location = useLocation();

  return (
    <>
      <MyNavbar setIsOpen={setIsOpen} listNavBar={[{ name: "Home", url: "/" }, { name: "Seguimiento personalizado", url: "/customers" }, { name: "Productos", url: "/products" }, { name: "Dashboard de ventas", url: "/sales_dashboard" }]} />
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <> </>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      onClick={() => {
                        goNavigate("/");
                      }}
                      icon={HiChartPie}
                      active={location.pathname === "/"}
                    >
                      Home
                    </Sidebar.Item>
                    <Sidebar.Item
                      onClick={() => {
                        goNavigate("/customers");
                      }}
                      icon={HiUsers}
                      active={location.pathname === "/customers"}
                    >
                      Seguimiento personalizado
                    </Sidebar.Item>
                    <Sidebar.Item
                      onClick={() => {
                        goNavigate("/products");
                      }}
                      icon={HiShoppingBag}
                      active={location.pathname === "/products"}
                    >
                      Productos
                    </Sidebar.Item>
                    {/* <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                      Sign in
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/authentication/sign-up"
                      icon={HiPencil}
                    >
                      Sign up
                    </Sidebar.Item> */}
                  </Sidebar.ItemGroup>
                  {/* <Sidebar.ItemGroup>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/"
                      icon={HiClipboard}
                    >
                      Docs
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://flowbite-react.com/"
                      icon={HiCollection}
                    >
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/issues"
                      icon={HiInformationCircle}
                    >
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup> */}
                </Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={ HiAdjustments } onClick={() => setIsOpenConfig(true)}>
                      Ajustes
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>

      <ModalConfig isOpen={isOpenConfig} handleClose={() => setIsOpenConfig(false)} dataToCard={{}} />

      <Outlet />
    </>
  );
}
