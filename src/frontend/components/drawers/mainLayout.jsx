import {Avatar, Divider, Drawer, Menu, Typography} from "antd";
import {array, bool, func, object, string} from "prop-types";

export const MainLayoutDrawer = ({
  setShowDrawer,
  showDrawer,
  handleNavigation,
  currentKey,
  navItems,
  userData,
}) => {
  return (
    <Drawer
      placement="right"
      closable={true}
      onClose={() => setShowDrawer(false)}
      open={showDrawer}
      className="p-0"
      bodyStyle={{
        padding: "24px 0",
      }}
      width={250}
    >
      {userData && (
        <>
          <div className="w-full flex justify-center">
            {userData && userData.profile_img ? (
              <Avatar src={userData.profile_img} size={90} />
            ) : (
              <Avatar src="/user-avatar.svg" size={90} />
            )}
          </div>
          <Typography.Title level={4} className="text-center my-4">
            {userData && userData.name ? userData.name : "-"}
          </Typography.Title>
          <Divider />
        </>
      )}

      <Menu
        onClick={handleNavigation}
        selectedKeys={[currentKey]}
        items={navItems}
      />
    </Drawer>
  );
};

MainLayoutDrawer.propTypes = {
  setShowDrawer: func,
  showDrawer: bool,
  handleNavigation: func,
  currentKey: string,
  navItems: array,
  userData: object,
};
