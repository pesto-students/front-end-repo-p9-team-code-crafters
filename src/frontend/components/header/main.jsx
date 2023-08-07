import {HamburgerIcon} from "@/assets/icons";
import {Button, Drawer, Menu} from "antd";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";

const Logo = () => (
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
);

export const MainHeader = () => {
  const [current, setCurrent] = useState("home");
  const [isResponsiveMenuOpen, setIsResponsiveMenuOpen] = useState(false);

  const router = useRouter();

  const showResponsiveMenu = () => {
    setIsResponsiveMenuOpen(true);
  };
  const onClose = () => {
    setIsResponsiveMenuOpen(false);
  };

  const handleNavigation = (event) => {
    setCurrent(event.key);
    if (isResponsiveMenuOpen) {
      setIsResponsiveMenuOpen(false);
    }
  };

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
      label: isResponsiveMenuOpen ? (
        <Link href="/login">Sign in</Link>
      ) : (
        <Button
          className="h-10"
          type="primary"
          onClick={() => router.push("/login")}
        >
          Sign in
        </Button>
      ),
      key: "login",
    },
  ];

  return (
    <header className="h-16 px-8 fixed top-0 left-0 w-full bg-pink sm:bg-white flex items-center z-10">
      <Logo />

      <nav id="mobile-nav" className="flex flex-grow sm:hidden justify-end">
        <Button
          icon={<HamburgerIcon />}
          className="px-0"
          type="secondary"
          onClick={showResponsiveMenu}
        >
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          placement="right"
          closable={true}
          onClose={onClose}
          open={isResponsiveMenuOpen}
        >
          <Menu
            onClick={handleNavigation}
            selectedKeys={[current]}
            items={navItems}
          />
        </Drawer>
      </nav>

      <nav id="nav" className="hidden sm:flex flex-grow justify-end">
        <Menu
          onClick={handleNavigation}
          selectedKeys={[current]}
          mode="horizontal"
          items={navItems}
          className="w-full flex justify-end"
        />
      </nav>
    </header>
  );
};
