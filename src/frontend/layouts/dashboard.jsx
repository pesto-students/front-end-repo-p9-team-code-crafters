import {useEffect, useState} from "react";
import {
  AuthenticationFooter,
  DashboardHeader,
  DashboardLayoutDrawer,
  FullPageLoader,
} from "../components";
import {bool, func, string} from "prop-types";
import Link from "next/link";
import {Button, Menu, Skeleton, message} from "antd";
import {useQuery} from "@tanstack/react-query";
import {logout, verifyUser} from "../services";
import {useRouter} from "next/router";
import {USER_ROLES} from "@/appData";

export default function DashboardLayout({
  children,
  showLoader,
  menuKey,
  setUserData = () => {},
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [callVerifyUser, setCallVerifyUser] = useState(true);
  const [current, setCurrent] = useState("");

  const router = useRouter();

  const {data: userData, isLoading} = useQuery({
    queryFn: () => verifyUser(),
    queryKey: ["verifyUserData"],
    onError: () => {
      message.info("user session expired");
      router.push("/login");
    },
    onSuccess: (data) => {
      setUserData(data);
      setCallVerifyUser(false);
    },
    enabled: callVerifyUser,
  });

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    setCurrent(menuKey);
  }, [menuKey]);

  const initialNavItems = [
    {
      label: <Link href="/profile">My Profile</Link>,
      key: "profile",
    },
    {
      label: <Link href="/fundraiser/myfundraiser">My Fundraisers</Link>,
      key: "fundraiser",
    },

    {
      label: <Link href="/donations">My Donations</Link>,
      key: "donation",
    },
  ];

  const getNavItems = () => {
    const defaultItems = [
      {
        label: <div />,
        key: "space",
        disabled: true,
      },
      {
        label: (
          <Button
            onClick={handleLogout}
            type="primary"
            className="text-center flex items-center w-full"
          >
            <span className="text-center w-full">Logout</span>
          </Button>
        ),
        key: "logout",
      },
    ];
    const adminItems = [
      {
        label: <Link href="/admin/users">User List</Link>,
        key: "users",
      },
      {
        label: <Link href="/admin/fundraisers">Fundraiser List</Link>,
        key: "adminFundraisers",
      },
    ];
    return userData && userData.role === USER_ROLES.ADMIN
      ? [...initialNavItems, ...adminItems, ...defaultItems]
      : [...initialNavItems, ...defaultItems];
  };

  return (
    <>
      {showLoader ? <FullPageLoader /> : null}
      <>
        <DashboardHeader
          userData={userData}
          handleMenuClick={() => setShowMenu(true)}
        />
        <main className="flex mt-16 min-h-mainLayout bg-[#f0f0f0]">
          <div className="bg-white w-56 hidden md:block shadow">
            <Menu selectedKeys={[current]} items={getNavItems()} />
          </div>
          <div className="flex-1 px-8 max-h-dashboardmain overflow-y-auto">
            {isLoading ? <Skeleton active /> : children}
          </div>
        </main>
        <AuthenticationFooter />
        <DashboardLayoutDrawer
          showDrawer={showMenu}
          setShowDrawer={setShowMenu}
          handleNavigation={() => {}}
          currentKey={current}
          navItems={getNavItems()}
          userData={userData}
        />
      </>
    </>
  );
}

DashboardLayout.propTypes = {
  showLoader: bool,
  menuKey: string,
  setUserData: func,
};
