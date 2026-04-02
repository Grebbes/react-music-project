import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const MusicBar = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #f53192;
  border-radius: 4px;
  cursor: pointer;
  margin: 40px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #f53192;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 8px solid #fff;
  }

  ${mediaQueries.mobile} {
    height: 4px;
    margin: 20px;

    &::-webkit-slider-thumb {
      width: 16px;
      height: 16px;
      border: 6px solid #fff;
    }
  }

  ${mediaQueries.tablet} {
    height: 5px;
    margin: 30px;

    &::-webkit-slider-thumb {
      width: 18px;
      height: 18px;
      border: 7px solid #fff;
    }
  }
`;

export default MusicBar;
