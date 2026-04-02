import styled from "styled-components";
import { mediaQueries } from "../../styles/media-queries";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 400px;

  ${mediaQueries.mobile} {
    gap: 0.8rem;
    max-width: 300px;
  }

  ${mediaQueries.tablet} {
    gap: 1rem;
    max-width: 350px;
  }

  ${mediaQueries.desktop} {
    gap: 1.5rem;
    max-width: 450px;
  }
`;

export default ContentContainer;
