import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  :nth-child(2) {
    transform: scale(1.2);
    background: #f53192;
    color: #fff;
  }

  ${mediaQueries.mobile} {
    :nth-child(2) {
      transform: scale(1.1);
    }
  }
`;

export default Controls;
