import {Button, Menu} from "antd";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";

export const MainHeader = () => {
  const [current, setCurrent] = useState("home");
  const router = useRouter();

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
        <Button type="primary" onClick={() => router.push("/login")}>
          Sign in
        </Button>
      ),
      key: "signin",
    },
  ];

  const handleNavigation = (event) => {
    setCurrent(event.key);
  };
  return (
    <header className="h-16 px-8 fixed top-0 left-0 w-full bg-pink sm:bg-white flex items-center justify-between">
      <figure
        id="logo-container"
        className="h-16 w-[150px] sm:w-[200px] items-center flex"
      >
        <img
          id="logo"
          className="h-16 w-[200px] hidden sm:block"
          src="/logo.svg"
          alt="logo"
        />
        <span className="font-semibold text-2xl tracking-wide sm:hidden text-white">
          ImpactHub
        </span>
      </figure>

      <div className="flex-grow flex justify-end">
        <Menu
          onClick={handleNavigation}
          selectedKeys={[current]}
          mode="horizontal"
          items={navItems}
        />
      </div>
    </header>
  );
};
