import ButtonContainer from "./components/layout/button-container";
import ContentContainer from "./components/layout/contentcontainer";
import { GlobalStyles } from "./components/layout/globalstyles";
import StyledSection from "./components/layout/stylecsection";
import StyledMain from "./components/layout/styledmain";
import SongCircles from "./components/ui/songcircle";
import StyledButton from "./components/ui/styled-button";

export default function App() {
  return (
    <StyledMain>
      <GlobalStyles></GlobalStyles>
      <ContentContainer>
        <h1>Top Songs from Jamedon</h1>
        <ButtonContainer>
          <StyledButton>week</StyledButton>
          <StyledButton>month</StyledButton>
          <StyledButton>year</StyledButton>
        </ButtonContainer>
        <StyledSection>
          <SongCircles>Song 1</SongCircles>
          <SongCircles>Song 2</SongCircles>
          <SongCircles>Song 3</SongCircles>
        </StyledSection>
        <StyledSection>
          <SongCircles>Selected Song</SongCircles>
        </StyledSection>
      </ContentContainer>
    </StyledMain>
  );
}
