/* eslint-disable @next/next/no-img-element */

import {HamburgerIcon} from "@/assets/icons";
import {Button} from "antd";
import {useRouter} from "next/router";
import {func} from "prop-types";

export const DashboardHeader = ({handleMenuClick}) => {
  const router = useRouter();

  return (
    <header className="h-16 px-8 fixed top-0 left-0 w-full bg-pink md:bg-white flex items-center justify-between border-b border-solid border-[#eeeeee]">
      <span
        onClick={() => router.push("/")}
        className="font-semibold text-2xl tracking-wide text-white md:text-pink md:tracking-normal md:font-bold"
      >
        ImpactHub
      </span>
      <div>
        <nav id="mobile-nav" className="flex flex-grow justify-end">
          <Button
            icon={<HamburgerIcon />}
            className="px-0"
            type="secondary"
            onClick={handleMenuClick}
          >
            <span className="barsBtn"></span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

DashboardHeader.propTypes = {
  handleMenuClick: func,
};
