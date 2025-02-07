import { css } from "@emotion/react";
import 'normalize.css';
const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  html,
  body,
  section,
  div {
    font-family: "Open Sans", "Sans-serif";
    transition-duration: 0.2s;
    transition-property: background-color, color;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;

export default globalStyles;
