import React from "react";
import {
  ITabContext,
  TabContext,
  TTab,
  TAB_ORDER,
} from "../contexts/TabContext";

const ListItem = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TTab;
}) => {
  const { activeTab, setActiveTab, setDirection } = React.useContext(
    TabContext
  ) as ITabContext;

  const handleClick = () => {
    const index = TAB_ORDER.indexOf(value);
    const currentIndex = TAB_ORDER.indexOf(activeTab);

    const direction = index > currentIndex ? "forward" : "backward";
    setDirection(direction);
    setActiveTab(value);
  };

  return (
    <li
      data-value={value}
      data-active={activeTab === value}
      onClick={handleClick}
      className="relative cursor-pointer transition-opacity duration-200 data-[active=false]:opacity-50"
    >
      {children}
    </li>
  );
};

const Nav = () => {
  return (
    <nav className="py-4">
      <ul className="flex items-center gap-8 p-0 m-0 mt-8 mb-2 font-bold list-none">
        <ListItem value="projects">Projects</ListItem>
        <ListItem value="work">Work</ListItem>
        <ListItem value="music">Music</ListItem>
        <ListItem value="contact">Contact</ListItem>
      </ul>
    </nav>
  );
};

export default Nav;
