import {useRouter} from "next/router";
import {
  FullPageLoader,
  LinkButton,
  MainFooter,
  MainHeader,
  MainLayoutDrawer,
} from "../components";
import {bool, func, string} from "prop-types";
import {logout, verifyUser} from "../services";
import {useCallback, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Link from "next/link";
import {Avatar} from "antd";

export default function MainLayout({
  children,
  showLoader,
  setUserData,
  menuKey,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [verifiedUserData, setVerifiedUserData] = useState(null);
  const [current, setCurrent] = useState("");

  const router = useRouter();

  const {data: newUserData} = useQuery({
    queryFn: () => verifyUser(),
    queryKey: ["verifyUserData"],
    onError: () => {
      setVerifiedUserData(null);
    },
    onSuccess: (data) => {
      setVerifiedUserData(data);
    },
  });

  const handleLogout = () => {
    logout();
    router.reload();
  };

  const handleNavigation = (event) => {
    setCurrent(event.key);
    if (showMenu) {
      setShowMenu(false);
    }
  };

  const UserProfileItem = () => (
    <div className="items-center flex">
      {verifiedUserData && verifiedUserData.name ? (
        <span className="mr-4 text-pink">
          {verifiedUserData.name.split(" ")[0]}
        </span>
      ) : null}
      {verifiedUserData && verifiedUserData.profile_img ? (
        <Avatar src={verifiedUserData.profile_img} size={48} />
      ) : (
        <Avatar src="/user-avatar.svg" size={48} />
      )}
    </div>
  );

  const myProfileNavItems = [
    showMenu
      ? {
          type: "divider",
        }
      : null,
    {
      label: <Link href="/">My Profile</Link>,
      key: "profile",
    },
    {
      label: <Link href="/fundraiser/myfundraiser">My Fundraisers</Link>,
      key: "myFundraisers",
    },
    {
      label: <Link href="/">My Donations</Link>,
      key: "myDonations",
    },
    {
      label: <LinkButton text="Logout" onClickHandler={handleLogout} />,
      key: "logout",
    },
  ];

  const getMainLayoutNavItems = useCallback(() => {
    const navItems = [
      {
        label: <Link href="/">Home</Link>,
        key: "home",
      },
      {
        label: <Link href="/fundraiser">Discover</Link>,
        key: "discover",
      },
      {
        label: <Link href="/">About</Link>,
        key: "about",
      },
    ];
    if (verifiedUserData) {
      if (showMenu) {
        navItems.push(...myProfileNavItems);
      } else {
        navItems.push({
          label: <UserProfileItem />,
          key: verifiedUserData?.name,
          children: myProfileNavItems,
        });
      }
    } else {
      navItems.push({
        label: (
          <LinkButton
            text="Sign in"
            onClickHandler={() => router.push("/login")}
          />
        ),
        key: "login",
      });
    }

    return navItems;
  }, [verifiedUserData]);

  useEffect(() => {
    setCurrent(menuKey);
  }, [menuKey]);

  useEffect(() => {
    setUserData(verifiedUserData);
  }, [newUserData, verifiedUserData]);

  return (
    <>
      {showLoader ? <FullPageLoader /> : null}
      <>
        <MainHeader
          userData={verifiedUserData}
          handleMenuClick={() => setShowMenu(true)}
          currentKey={current}
          navItems={getMainLayoutNavItems()}
          handleNavigation={handleNavigation}
        />
        <main className="flex items-center justify-center mt-16 flex-col">
          {children}
        </main>
        <MainFooter />
        <MainLayoutDrawer
          showDrawer={showMenu}
          setShowDrawer={setShowMenu}
          handleNavigation={handleNavigation}
          currentKey={current}
          navItems={getMainLayoutNavItems()}
          userData={verifiedUserData}
        />
      </>
    </>
  );
}

MainLayout.propTypes = {
  showLoader: bool,
  menuKey: string,
  setUserData: func,
};
