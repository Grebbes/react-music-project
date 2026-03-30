import { Link } from "react-router";
import playerImage from "./assets/player.png";
import StyledImgContainer from "./components/layout/circle-image";
import { GlobalStyles } from "./components/layout/globalstyles";
import IconCircle from "./components/layout/icon-circle";
import StyledLandingPage from "./components/layout/styled-landing-page";
import StyledButton from "./components/ui/styled-button";

export default function LandingPage() {
  return (
    <StyledLandingPage>
      <GlobalStyles></GlobalStyles>
      <IconCircle>
        <StyledImgContainer src={playerImage} alt="Music Player" />
      </IconCircle>
      <h1
        style={{
          color: "whitesmoke",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          marginTop: "100px",
        }}
      >
        Welcome, <br></br>View The top songs of Jamedon
      </h1>
      <Link to="/overall">
        <StyledButton>view</StyledButton>
      </Link>
    </StyledLandingPage>
  );
}
