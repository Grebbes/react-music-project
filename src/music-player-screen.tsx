import { useRef, useState } from "react";
import { useParams } from "react-router";
import type { Song } from "./api/songApi";
import StyledImgContainer from "./components/layout/circle-image";
import ContentContainer from "./components/layout/contentcontainer";
import { GlobalStyles } from "./components/layout/globalstyles";
import StyledLandingPage from "./components/layout/styled-landing-page";
import StyledPContainer from "./components/layout/styled-p-container";
import AudioDisplay from "./components/ui/audio-display";
import SongCircles from "./components/ui/songcircle";

export default function MusicPlayerScreen() {
  const { timeframe } = useParams<{ timeframe: Timeframe }>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const audioTitle = songs.find((song) => song.id === currentlyPlaying)?.name;
  const audioImage = songs.find(
    (song) => song.id === currentlyPlaying,
  )?.album_image;

  const playSong = (song: Song) => {
    if (currentlyPlaying === song.id) return;
    if (audioRef.current) {
      audioRef.current.src = song.audio;
      audioRef.current.play();
      setCurrentlyPlaying(song.id);
    }
  };

  return (
    <StyledLandingPage>
      <GlobalStyles></GlobalStyles>
      <ContentContainer>
        {
          <>
            <StyledPContainer>{audioTitle}</StyledPContainer>
            <SongCircles>
              <StyledImgContainer src={audioImage} />
            </SongCircles>
          </>
        }

        <AudioDisplay
          ref={audioRef}
          controls
          style={{ display: currentlyPlaying ? "block" : "none" }}
        ></AudioDisplay>
      </ContentContainer>
    </StyledLandingPage>
  );
}
