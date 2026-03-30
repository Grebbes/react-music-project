import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  getMonthlyPopularity,
  getOverallPopularity,
  getWeeklyPopularity,
  type Song,
} from "./api/songApi";
import ButtonContainer from "./components/layout/button-container";
import StyledImgContainer from "./components/layout/circle-image";
import ContentContainer from "./components/layout/contentcontainer";
import { GlobalStyles } from "./components/layout/globalstyles";
import StyledSection from "./components/layout/stylecsection";
import StyledH2 from "./components/layout/styled-h2";
import StyledPContainer from "./components/layout/styled-p-container";
import StyledMain from "./components/layout/styledmain";
import AudioDisplay from "./components/ui/audio-display";
import NoSongDiv from "./components/ui/no-song-div";
import SongCircles from "./components/ui/songcircle";
import StyledButton from "./components/ui/styled-button";

type Timeframe = "overall" | "monthly" | "weekly";
type AppProps = {
  timeframe: Timeframe;
};

export default function App({ timeframe }: AppProps) {
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

  const audioImage = songs.find(
    (song) => song.id === currentlyPlaying,
  )?.album_image;

  const audioTitle = songs.find((song) => song.id === currentlyPlaying)?.name;

  useEffect(() => {
    async function fetchSongs() {
      try {
        let songData: Song[];
        switch (timeframe) {
          case "monthly":
            songData = await getMonthlyPopularity();
            break;
          case "weekly":
            songData = await getWeeklyPopularity();
            break;
          default:
            songData = await getOverallPopularity();
        }
        setSongs(songData);
      } catch (error) {
        console.error("error fetching songs:", error);
      }
    }

    fetchSongs();
  }, [timeframe]);

  return (
    <StyledMain>
      <GlobalStyles></GlobalStyles>
      <ContentContainer>
        <h1>Top Songs from Jamedon</h1>
        <ButtonContainer>
          <Link to="/weekly">
            <StyledButton>Week</StyledButton>
          </Link>
          <Link to="/monthly">
            <StyledButton>Month</StyledButton>
          </Link>
          <Link to="/overall">
            <StyledButton>Overall</StyledButton>
          </Link>
        </ButtonContainer>
        <StyledH2>
          {timeframe === "overall"
            ? "Overall Popularity"
            : timeframe === "monthly"
              ? "Monthly Popularity"
              : "Weekly Popularity"}
        </StyledH2>
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
            {currentlyPlaying ? (
              <>
                <StyledPContainer>{audioTitle}</StyledPContainer>
                <SongCircles>
                  <StyledImgContainer src={audioImage} />
                </SongCircles>
              </>
            ) : (
              <>
                <StyledPContainer>No song currently playing</StyledPContainer>
                <SongCircles>
                  <NoSongDiv>Click a song above to start playing</NoSongDiv>
                </SongCircles>
              </>
            )}

            <AudioDisplay
              ref={audioRef}
              controls
              style={{ display: currentlyPlaying ? "block" : "none" }}
            ></AudioDisplay>
          </ContentContainer>
        </StyledSection>
      </ContentContainer>
    </StyledMain>
  );
}
