import React from "react";
import Logo from "../../assets/icons/logo.svg?react";
import Wrapper from "../common/Wrapper/Wrapper";
import { SideBarLogoTitle } from "./styles";

export default function SideBarLogo({ onClick }) {
  const clickHandler = () => {
    onClick();
  };
  return (
    <Wrapper
      padding="0 1em"
      justify="flex-start"
      alignItems="center"
      cursor="pointer"
      onClick={clickHandler}
    >
      <Logo />
      <SideBarLogoTitle>Kanban</SideBarLogoTitle>
    </Wrapper>
  );
}
