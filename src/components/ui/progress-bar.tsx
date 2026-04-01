import styled from "styled-components";

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
`;

export default MusicBar;
