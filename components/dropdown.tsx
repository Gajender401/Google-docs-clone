'use client'
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

interface DropdownProps {
    children: React.ReactNode;
  }

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <p className="menu-item">
        Log out
      </p>
    ),
  },
];

const CommonDropdown: React.FC<DropdownProps> = ({ children }) => (
  <Dropdown placement="bottomRight" menu={{ items }}>
    {children}
  </Dropdown>
);

export default CommonDropdown;
