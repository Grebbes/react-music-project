import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const StyledSection = styled.section`
  display: flex;
  gap: 100px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;

  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;
  }

  ${mediaQueries.tablet} {
    flex-direction: column;
    gap: 40px;
    margin-top: 25px;
  }

  ${mediaQueries.desktop} {
    flex-direction: row;
    gap: 120px;
    margin-top: 40px;
  }
`;

export default StyledSection;
