import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const StyledControlls = styled.div`
  width: 60px;
  height: 60px;
  margin: 20px;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #f53192;
  box-shadow: 0 2px 2px rgba(255, 26, 26, 0.22);
  cursor: pointer;
  transition: all 0.2s ease;

  ${mediaQueries.mobile} {
    width: 50px;
    height: 50px;
    margin: 15px;
    font-size: 14px;
  }

  ${mediaQueries.tablet} {
    width: 55px;
    height: 55px;
    margin: 18px;
    font-size: 16px;
  }
`;

export default StyledControlls;
