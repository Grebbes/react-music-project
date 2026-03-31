import { useEffect, useRef, useState } from "react";
import {
  getMonthlyPopularity,
  getOverallPopularity,
  getWeeklyPopularity,
  type Song,
} from "./api/songApi";
import playerImage from "./assets/player.png";
import ButtonContainer from "./components/layout/button-container";
import StyledImgContainer from "./components/layout/circle-image";
import ContentContainer from "./components/layout/contentcontainer";
import { GlobalStyles } from "./components/layout/globalstyles";
import IconCircle from "./components/layout/icon-circle";
import StyledSection from "./components/layout/stylecsection";
import StyledH2 from "./components/layout/styled-h2";
import StyledPContainer from "./components/layout/styled-p-container";
import StyledMain from "./components/layout/styledmain";
import AudioDisplay from "./components/ui/audio-display";
import SongCircles from "./components/ui/songcircle";
import StyledButton from "./components/ui/styled-button";
import StyledNavLink from "./components/ui/styled-nav-link";

type Timeframe = "overall" | "monthly" | "weekly";
type AppProps = {
  timeframe: Timeframe;
};

export default function App({ timeframe }: AppProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string>();

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
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <IconCircle>
            <StyledImgContainer src={playerImage} alt="Music Player" />
          </IconCircle>
        </div>
        <h1
          style={{
            color: "white",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)",
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          Top Songs from Jamedon
        </h1>
        <ButtonContainer>
          <StyledNavLink to="/weekly">
            <StyledButton>Week</StyledButton>
          </StyledNavLink>
          <StyledNavLink to="/monthly">
            <StyledButton>Month</StyledButton>
          </StyledNavLink>
          <StyledNavLink to="/overall">
            <StyledButton>Overall</StyledButton>
          </StyledNavLink>
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
                <div
                  style={{
                    textAlign: "center",
                    color: "whitesmoke",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <h3>Ready to Play</h3>
                  <p>Click a song above to start playing</p>
                </div>
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
