"use client";

import { FaAngleDoubleRight } from "react-icons/fa";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import PropTypes from "prop-types"; // Importa PropTypes
import useLogout from "../../hooks/auth/useLogout";

export default function MyNavbar({ setIsOpen }) {
  const uselogout = useLogout();
  const logout = () => {
    uselogout();
    //Recargar la página
    window.location.reload();
  };
  return (
    <Navbar fluid rounded>
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
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

// Añade la validación de tipo para setIsOpen utilizando PropTypes
MyNavbar.propTypes = {
  setIsOpen: PropTypes.func.isRequired, // Requiere que la función sea una función
};
