"use client";

import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// import { HiChevronDown } from "react-icons/hi";
import {
  DarkThemeToggle,
  Avatar,
  Dropdown,
  Navbar,
  Button,
} from "flowbite-react";
import PropTypes from "prop-types"; // Importa PropTypes
import useLogout from "../../hooks/auth/useLogout";
import getImageUrl from "../../api/getImageUrl";

export default function MyNavbar({ setIsOpen, listNavBar }) {
  const uselogout = useLogout();
  const logout = () => {
    uselogout();
    //Recargar la página
    window.location.reload();
  };
  
  const [imgUser, setImgUser] = useState("");
  useEffect( () => {
    // setImgUser(getImageUrl(1));
    getImageUrl(2).then((url) => {
      console.log(url);
    });
  }, []);
  
  return (
    <Navbar fluid rounded className="fixed w-full z-20 top-0 start-0 border-b"> 
      <Navbar.Brand
        onClick={() => setIsOpen(true)}
        onMouseMove={() => setIsOpen(true)}
      >
        <Button>
          <div className="flex items-center">
            <FaAngleDoubleRight />
          </div>
          <div className="flex items-center">
            {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              DATACOPIER CORP
            </span>
          </div>
        </Button>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={imgUser}
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{JSON.parse(localStorage.getItem("user"))?.name || "User Name"}</span>
            <span className="block truncate text-sm font-medium">
              {JSON.parse(localStorage.getItem("user"))?.email || "User Email"}
            </span>
          </Dropdown.Header>
          {/* <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item> */}
          {/* <Dropdown.Divider /> */}
          <Dropdown.Item onClick={() => logout()}>Cerrar sesión</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {listNavBar.map((item, index) => (
          <Navbar.Link
            key={index}
            href={item.url}
            active={item.url === window.location.pathname}
          >
            {item.name}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}

// Añade la validación de tipo para setIsOpen utilizando PropTypes
MyNavbar.propTypes = {
  setIsOpen: PropTypes.func.isRequired, // Requiere que la función sea una función
  listNavBar: PropTypes.array.isRequired,
};
