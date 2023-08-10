import {useRouter} from "next/router";
import {
  FullPageLoader,
  MainFooter,
  MainHeader,
  MainLayoutDrawer,
} from "../components";
import {bool, func, string} from "prop-types";
import {logout, verifyUser} from "../services";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Link from "next/link";
import {Avatar, Button} from "antd";

export default function MainLayout({children, showLoader, setUserData}) {
  const [showMenu, setShowMenu] = useState(false);
  const [current, setCurrent] = useState("home");

  const router = useRouter();

  const {data: userData} = useQuery({
    queryFn: () => verifyUser(),
    queryKey: ["verifyUserData"],
    onError: () => {},
    onSuccess: (data) => {
      setUserData(data);
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
      {userData && userData.name ? (
        <span className="mr-4 text-pink">{userData.name.split(" ")[0]}</span>
      ) : null}
      {userData && userData.profile_img ? (
        <Avatar src={userData.profile_img} size={48} />
      ) : (
        <Avatar src="/user-avatar.svg" size={48} />
      )}
    </div>
  );

  const LinkButton = ({text, onClickHandler}) => (
    <Button
      className="h-10 flex items-center justify-center w-full"
      type="primary"
      onClick={onClickHandler}
    >
      {text}
    </Button>
  );

  LinkButton.propTypes = {
    text: string,
    onClickHandler: func,
  };

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
      label: <Link href="/">My Fundraisers</Link>,
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

  const getMainLayoutNavItems = () => {
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
    ];
    if (userData) {
      if (showMenu) {
        navItems.push(...myProfileNavItems);
      } else {
        navItems.push({
          label: <UserProfileItem />,
          key: userData?.name,
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
  };

  return (
    <>
      {showLoader ? <FullPageLoader /> : null}
      <>
        <MainHeader
          userData={userData}
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
          userData={userData}
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
