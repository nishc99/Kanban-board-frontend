import React from "react";
import { BoardListItem, BoardListItemName } from "./styles";
import IconLight from "../../assets/icons/layout-light.svg?react";
import IconDark from "../../assets/icons/layout-dark.svg?react";
import { getUserThemePref } from "../../helpers/helpers";
import Wrapper from "../common/Wrapper/Wrapper";

export default function BoardItemUser({
  board,
  isActive,
  ...rest
}) {
  const isDark = getUserThemePref();

  return (
    <BoardListItem isActive={isActive} {...rest}>
      <Wrapper bgColor="transparent" cursor="pointer">
        {isDark ? <IconLight /> : <IconDark />}
        <BoardListItemName>{board.title}</BoardListItemName>
      </Wrapper>
    </BoardListItem>
  );
}
