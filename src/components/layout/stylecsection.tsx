import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const StyledSection = styled.section`
  display: flex;
  gap: 80px;
  margin-top: 20px;
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
`;

export default StyledSection;
