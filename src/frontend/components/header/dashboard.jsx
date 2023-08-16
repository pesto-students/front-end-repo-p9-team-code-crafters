/* eslint-disable @next/next/no-img-element */

import {HamburgerIcon} from "@/assets/icons";
import {Avatar, Button} from "antd";
import {useRouter} from "next/router";
import {func, object} from "prop-types";

export const DashboardHeader = ({handleMenuClick, userData}) => {
  const router = useRouter();

  return (
    <header className="h-16 px-8 fixed top-0 left-0 w-full bg-pink md:bg-white flex items-center justify-between border-b border-solid border-[#eeeeee] z-10">
      <span
        onClick={() => router.push("/")}
        className="cursor-pointer font-semibold text-2xl tracking-wide text-white md:text-pink md:tracking-normal md:font-bold"
      >
        ImpactHub
      </span>
      <div>
        <nav id="mobile-nav" className="flex flex-grow justify-end">
          <Button
            icon={<HamburgerIcon />}
            className="px-0 md:hidden"
            type="secondary"
            onClick={handleMenuClick}
          >
            <span className="barsBtn"></span>
          </Button>
          <div className="items-center hidden md:flex cursor-pointer">
            {userData && userData.name ? (
              <span className="mr-4 text-pink">
                {userData.name.split(" ")[0]}
              </span>
            ) : null}
            {userData && userData.profile_img ? (
              <Avatar src={userData.profile_img} size={48} />
            ) : (
              <Avatar src="/user-avatar.svg" size={48} />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

DashboardHeader.propTypes = {
  handleMenuClick: func,
  userData: object,
};
