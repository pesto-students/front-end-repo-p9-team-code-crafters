import {Button, Menu} from "antd";
import Link from "next/link";
import {useState} from "react";

const navItems = [
  {
    label: <Link href="/">Home</Link>,
    key: "home",
  },
  {
    label: <Link href="/">Discover</Link>,
    key: "discover",
  },
  {
    label: <Link href="/">About</Link>,
    key: "about",
  },
  {
    label: (
      <Button type="primary" className="h-6">
        Sign in
      </Button>
    ),
    key: "signin",
  },
];

export const MainHeader = () => {
  const [current, setCurrent] = useState("home");

  const handleNavigation = (event) => {
    setCurrent(event.key);
  };
  return (
    <header className="h-16 px-8 sm:px-40 fixed top-0 left-0 w-full bg-pink sm:bg-white flex items-center">
      <figure
        id="logo-container"
        className="h-16 w-auto items-center flex flex-grow"
      >
        <img
          id="logo"
          className="h-16 w-auto hidden sm:block"
          src="/logo.svg"
          alt="logo"
        />
        <span className="font-semibold text-2xl tracking-wide sm:hidden text-white">
          ImpactHub
        </span>
      </figure>

      <Menu
        onClick={handleNavigation}
        selectedKeys={[current]}
        mode="horizontal"
        items={navItems}
      />
    </header>
  );
};
