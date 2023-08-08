import {useEffect, useState} from "react";
import {
  AuthenticationFooter,
  DashboardHeader,
  DashboardLayoutDrawer,
  FullPageLoader,
} from "../components";
import {bool, string} from "prop-types";
import Link from "next/link";
import {Button, Menu} from "antd";

export default function DashboardLayout({children, showLoader, menuKey}) {
  const [showMenu, setShowMenu] = useState(false);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(menuKey);
  }, [menuKey]);

  const navItems = [
    {
      label: <Link href="/">My Profile</Link>,
      key: "profile",
    },
    {
      label: <Link href="/">My Fundraisers</Link>,
      key: "fundraiser",
    },

    {
      label: <Link href="/">My Donations</Link>,
      key: "donation",
    },
    {
      label: <div />,
      key: "space",
      disabled: true,
    },
    {
      label: (
        <Button type="primary" className="text-center flex items-center w-full">
          <span className="text-center w-full">Logout</span>
        </Button>
      ),
      key: "logout",
    },
  ];

  return (
    <>
      {showLoader ? <FullPageLoader /> : null}
      <>
        <DashboardHeader handleMenuClick={() => setShowMenu(true)} />
        <main className="flex mt-16 min-h-mainLayout bg-[#f0f0f0]">
          <div className="bg-white w-56 hidden md:block shadow">
            <Menu selectedKeys={[current]} items={navItems} />
          </div>
          <div className="flex-1 px-8">{children}</div>
        </main>
        <AuthenticationFooter />
        <DashboardLayoutDrawer
          showDrawer={showMenu}
          setShowDrawer={setShowMenu}
          handleNavigation={() => {}}
          currentKey={current}
          navItems={navItems}
        />
      </>
    </>
  );
}

DashboardLayout.propTypes = {
  showLoader: bool,
  menuKey: string,
};
