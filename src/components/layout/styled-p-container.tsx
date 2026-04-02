import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const StyledPContainer = styled.p`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
  max-width: 150px;
  color: whitesmoke;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);

  ${mediaQueries.mobile} {
    font-size: 14px;
    max-width: 120px;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  ${mediaQueries.tablet} {
    font-size: 16px;
    max-width: 140px;
    margin-top: 9px;
    margin-bottom: 9px;
  }

  ${mediaQueries.desktop} {
    font-size: 20px;
    max-width: 200px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;
export default StyledPContainer;
