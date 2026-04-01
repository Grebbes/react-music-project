import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  getMonthlyPopularity,
  getOverallPopularity,
  getWeeklyPopularity,
  type Song,
} from "./api/songApi";
import StyledImgContainer from "./components/layout/circle-image";
import ContentContainer from "./components/layout/contentcontainer";
import { GlobalStyles } from "./components/layout/globalstyles";
import StyledPContainer from "./components/layout/styled-p-container";
import StyledMain from "./components/layout/styledmain";
import AudioDisplay from "./components/ui/audio-display";
import SongCircles from "./components/ui/songcircle";

type Timeframe = "overall" | "monthly" | "weekly";

export default function MusicPlayerScreen() {
  const { timeframe, songid } = useParams<{ timeframe: Timeframe }>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const audioTitle = songs.find((song) => song.id === songid)?.name;
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string>();
  const audioImage = songs.find((song) => song.id === songid)?.album_image;

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

  const playSong = (song: Song) => {
    if (currentlyPlaying === song.id) return;
    if (audioRef.current) {
      audioRef.current.src = song.audio;
      audioRef.current.play();
      setCurrentlyPlaying(song.id);
    }
  };
  useEffect(() => {
    async function autoplaySong() {
      if (!songs.length || !songid || !audioRef.current) return;

      const currentSong = songs.find((song) => song.id === songid);

      if (!currentSong) return;
      if (currentlyPlaying === currentSong.id) return;

      playSong(currentSong);
      autoplaySong();
    }
  }, [songs, songid]);

  return (
    <StyledMain>
      <GlobalStyles></GlobalStyles>
      <ContentContainer>
        <StyledPContainer>{audioTitle}</StyledPContainer>
        <SongCircles>
          <StyledImgContainer src={audioImage} />
        </SongCircles>

        <AudioDisplay
          ref={audioRef}
          controls
          style={{ display: currentlyPlaying ? "block" : "none" }}
        ></AudioDisplay>
      </ContentContainer>
    </StyledMain>
  );
}
