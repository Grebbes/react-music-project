import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const ButtonContainer = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 50px;
  justify-content: center;
  align-items: center;

  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: 15px;
    margin-top: 30px;
  }

  ${mediaQueries.tablet} {
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
  }

  ${mediaQueries.desktop} {
    flex-direction: row;
    gap: 60px;
    margin-top: 60px;
  }
`;

export default ButtonContainer;
