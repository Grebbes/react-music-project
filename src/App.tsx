import { useEffect, useRef, useState } from "react";
import { getOverallPopularity, type Song } from "./api/songApi";
import ButtonContainer from "./components/layout/button-container";
import StyledImgContainer from "./components/layout/circle-image";
import ContentContainer from "./components/layout/contentcontainer";
import { GlobalStyles } from "./components/layout/globalstyles";
import StyledSection from "./components/layout/stylecsection";
import StyledPContainer from "./components/layout/styled-p-container";
import StyledMain from "./components/layout/styledmain";
import SongCircles from "./components/ui/songcircle";
import StyledButton from "./components/ui/styled-button";

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const playSong = (song: Song) => {
    if (currentlyPlaying === song.id) return;
    if (audioRef.current) {
      audioRef.current.src = song.audio;
      audioRef.current.play();
      setCurrentlyPlaying(song.id);
    }
  };

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
              <SongCircles>
                <StyledImgContainer
                  src={songs[0]?.album_image}
                  alt={songs[0]?.name}
                  onClick={() => playSong(songs[0])}
                />
              </SongCircles>
              <StyledPContainer>
                {songs[0]?.name}
                <br></br> {songs[0]?.artist_name}
              </StyledPContainer>
            </ContentContainer>
            <ContentContainer>
              <SongCircles>
                <StyledImgContainer
                  src={songs[1]?.album_image}
                  alt={songs[1]?.name}
                  onClick={() => playSong(songs[1])}
                />
              </SongCircles>
              <StyledPContainer>
                {songs[1]?.name}
                <br></br> {songs[1]?.artist_name}
              </StyledPContainer>
            </ContentContainer>
            <ContentContainer>
              <SongCircles>
                <StyledImgContainer
                  src={songs[2]?.album_image}
                  alt={songs[2]?.name}
                  onClick={() => playSong(songs[2])}
                />
              </SongCircles>
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
            <SongCircles>
              <StyledImgContainer
                src={songs[0]?.album_image}
                alt={songs[0]?.name}
                onClick={() => playSong(songs[0])}
              />
            </SongCircles>
            <audio
              ref={audioRef}
              controls
              style={{ display: currentlyPlaying ? "block" : "none" }}
            ></audio>
          </ContentContainer>
        </StyledSection>
      </ContentContainer>
    </StyledMain>
  );
}
