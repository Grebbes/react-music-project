import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const SongCircles = styled.div`
  display: flex;
  align-items: center;
  justify-self: auto;
  text-align: center;
  border-radius: 50%;
  height: 170px;
  width: 170px;
  overflow: hidden;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: rgba(0, 0, 0, 0.5);
  }

  ${mediaQueries.mobile} {
    height: 120px;
    width: 120px;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
  }

  ${mediaQueries.tablet} {
    height: 150px;
    width: 150px;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.35);
  }
`;

export default SongCircles;
