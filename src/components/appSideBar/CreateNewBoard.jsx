import React from "react";
import LayoutIconLight from "../../assets/icons/layout-light.svg?react";
import LayoutIconDark from "../../assets/icons/layout-dark.svg?react";
import Wrapper from "../common/Wrapper/Wrapper";
import { CreateNewTitle } from "./styles";
import { getUserThemePref } from "../../helpers/helpers";

export default function CreateNewBoard({ handler, title }) {
  const isDark = getUserThemePref();
  return (
    <Wrapper
      alignItems="center"
      onClick={handler}
      cursor="pointer"
      canHover={true}
      padding="0 1em"
      justify="flex-start"
    >
      {isDark ? <LayoutIconLight /> : <LayoutIconDark />}
      <CreateNewTitle>{title ? title : "Create New Board"}</CreateNewTitle>
    </Wrapper>
  );
}
