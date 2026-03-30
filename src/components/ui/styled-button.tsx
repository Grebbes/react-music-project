import styled from "styled-components";

const StyledButton = styled.button`
  padding: 12px 40px;
  border: 2px solid #ffffff;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #5211d4;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;

  &:hover {
    background: #ffffff;
    color: #4c0db8;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    border-color: #5211d4;
  }
`;

export default StyledButton;
