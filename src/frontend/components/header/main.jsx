import {HamburgerIcon} from "@/assets/icons";
import {Button, Menu} from "antd";
import {useRouter} from "next/router";
import {array, func, string} from "prop-types";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      id="logo-container"
      className="h-16 w-[150px] md:w-[200px] items-center flex cursor-pointer"
      onClick={() => router.push("/")}
    >
      <img
        id="logo"
        className="h-16 w-[200px] hidden md:block"
        src="/logo.svg"
        alt="logo"
      />
      <span className="font-semibold text-2xl tracking-wide md:hidden text-white">
        ImpactHub
      </span>
    </div>
  );
};

export const MainHeader = ({
  navItems,
  handleMenuClick,
  currentKey,
  handleNavigation,
}) => {
  return (
    <header className="h-16 px-8 fixed top-0 left-0 w-full bg-pink md:bg-white flex items-center z-10">
      <Logo />

      <nav id="nav" className="flex flex-grow justify-end">
        <Menu
          onClick={handleNavigation}
          selectedKeys={[currentKey]}
          mode="horizontal"
          items={navItems}
          className="w-full hidden md:flex justify-end"
        />

        <Button
          icon={<HamburgerIcon />}
          className="px-0 md:hidden"
          type="secondary"
          onClick={handleMenuClick}
        >
          <span className="barsBtn"></span>
        </Button>
      </nav>
    </header>
  );
};

MainHeader.propTypes = {
  navItems: array,
  handleMenuClick: func,
  currentKey: string,
  handleNavigation: func,
};
