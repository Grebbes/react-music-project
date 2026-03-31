import styled from "styled-components";

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
  box-shadow: 0 10px 10px #000000af;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export default SongCircles;
