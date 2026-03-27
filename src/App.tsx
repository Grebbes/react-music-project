import { useEffect, useState } from "react";
import { getOverallPopularity, type Song } from "./api/songApi";
import ButtonContainer from "./components/layout/button-container";
import ContentContainer from "./components/layout/contentcontainer";
import { GlobalStyles } from "./components/layout/globalstyles";
import StyledSection from "./components/layout/stylecsection";
import StyledPContainer from "./components/layout/styled-p-container";
import StyledMain from "./components/layout/styledmain";
import SongCircles from "./components/ui/songcircle";
import StyledButton from "./components/ui/styled-button";

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    async function fetchOverallSongs() {
      try {
        const overallSongs = await getOverallPopularity();
        setSongs(overallSongs);
      } catch (error) {
        console.error("error fetching songs:", error);
      }
    }

    fetchOverallSongs();
  }, []);

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
          <>
            <ContentContainer>
              <SongCircles></SongCircles>
              <StyledPContainer>
                {songs[0]?.name}
                <br></br> {songs[0]?.artist_name}
              </StyledPContainer>
            </ContentContainer>
            <ContentContainer>
              <SongCircles></SongCircles>
              <StyledPContainer>
                {songs[1]?.name}
                <br></br> {songs[1]?.artist_name}
              </StyledPContainer>
            </ContentContainer>
            <ContentContainer>
              <SongCircles></SongCircles>
              <StyledPContainer>
                {songs[2]?.name}
                <br></br> {songs[2]?.artist_name}
              </StyledPContainer>
            </ContentContainer>
          </>
        </StyledSection>
        <StyledSection>
          <ContentContainer>
            <StyledPContainer>{songs[0]?.name}</StyledPContainer>
            <SongCircles></SongCircles>
          </ContentContainer>
        </StyledSection>
      </ContentContainer>
    </StyledMain>
  );
}
