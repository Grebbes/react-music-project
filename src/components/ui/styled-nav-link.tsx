import { NavLink as BaseNavLink } from "react-router";
import styled from "styled-components";

const StyledNavLink = styled(BaseNavLink)`
  &.active button {
    border: 2px solid #5211d4;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
`;

export default StyledNavLink;
