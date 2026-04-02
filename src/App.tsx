import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
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
import StyledH1 from "./components/layout/styled-h1";
import StyledH2 from "./components/layout/styled-h2";
import StyledPContainer from "./components/layout/styled-p-container";
import StyledMain from "./components/layout/styledmain";
import SongCircles from "./components/ui/songcircle";
import StyledButton from "./components/ui/styled-button";
import StyledNavLink from "./components/ui/styled-nav-link";

type Timeframe = "overall" | "monthly" | "weekly";

export default function App() {
  const { timeframe } = useParams<{ timeframe: Timeframe }>();
  const [songs, setSongs] = useState<Song[]>([]);

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
        <StyledH1>Top Songs from Jamedon</StyledH1>
        <ButtonContainer>
          <StyledNavLink to="/overall">
            <StyledButton>Overall</StyledButton>
          </StyledNavLink>
          <StyledNavLink to="/monthly">
            <StyledButton>Month</StyledButton>
          </StyledNavLink>
          <StyledNavLink to="/weekly">
            <StyledButton>Week</StyledButton>
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
              <Link to={`/${timeframe}/musicplayer/${songs[0]?.id}`}>
                <SongCircles>
                  <StyledImgContainer
                    src={songs[0]?.album_image}
                    alt={songs[0]?.name}
                  />
                </SongCircles>
              </Link>
              <StyledPContainer>
                {songs[0]?.name}
                <br></br> {songs[0]?.artist_name}
              </StyledPContainer>
            </ContentContainer>
            <ContentContainer>
              <SongCircles>
                <Link to={`/${timeframe}/musicplayer/${songs[1]?.id}`}>
                  <StyledImgContainer
                    src={songs[1]?.album_image}
                    alt={songs[1]?.name}
                  />
                </Link>
              </SongCircles>
              <StyledPContainer>
                {songs[1]?.name}
                <br></br> {songs[1]?.artist_name}
              </StyledPContainer>
            </ContentContainer>
            <ContentContainer>
              <Link to={`/${timeframe}/musicplayer/${songs[2]?.id}`}>
                <SongCircles>
                  <StyledImgContainer
                    src={songs[2]?.album_image}
                    alt={songs[2]?.name}
                  />
                </SongCircles>
              </Link>
              <StyledPContainer>
                {songs[2]?.name}
                <br></br> {songs[2]?.artist_name}
              </StyledPContainer>
            </ContentContainer>
          </>
        </StyledSection>
        <StyledSection>
          <ContentContainer>
            <div
              style={{
                textAlign: "center",
                color: "whitesmoke",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                paddingBottom: "50px",
              }}
            >
              <h3>Ready to Play</h3>
              <p>Click a song above to start playing</p>
            </div>
          </ContentContainer>
        </StyledSection>
      </ContentContainer>
    </StyledMain>
  );
}
