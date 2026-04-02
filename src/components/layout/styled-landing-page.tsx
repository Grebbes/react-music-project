import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const StyledLandingPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  gap: 20px;
  padding: 20px;
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );

  ${mediaQueries.mobile} {
    gap: 15px;
    padding: 15px;
  }

  ${mediaQueries.tablet} {
    gap: 18px;
    padding: 18px;
  }

  ${mediaQueries.desktop} {
    gap: 25px;
    padding: 25px;
  }
`;

export default StyledLandingPage;
