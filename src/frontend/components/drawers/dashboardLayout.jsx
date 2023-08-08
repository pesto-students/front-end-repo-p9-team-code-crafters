import {Divider, Drawer, Menu} from "antd";
import {useRouter} from "next/router";
import {array, bool, func, string} from "prop-types";

export const DashboardLayoutDrawer = ({
  setShowDrawer,
  showDrawer,
  handleNavigation,
  currentKey,
  navItems,
}) => {
  const router = useRouter();
  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setShowDrawer(false)}
      open={showDrawer}
      className="p-0"
      bodyStyle={{
        padding: "24px 0",
      }}
      width={250}
    >
      <div className="text-center mb-4">
        <span
          onClick={() => router.push("/")}
          className="font-semibold text-2xl text-pink"
        >
          ImpactHub
        </span>
      </div>
      <Divider />
      <Menu
        onClick={handleNavigation}
        selectedKeys={[currentKey]}
        items={navItems}
      />
    </Drawer>
  );
};

DashboardLayoutDrawer.propTypes = {
  setShowDrawer: func,
  showDrawer: bool,
  handleNavigation: func,
  currentKey: string,
  navItems: array,
};
