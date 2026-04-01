import {
  faBackward,
  faForward,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
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
import StyledLandingPage from "./components/layout/styled-landing-page";
import StyledPContainer from "./components/layout/styled-p-container";
import AudioDisplay from "./components/ui/audio-display";
import Controls from "./components/ui/controls";
import MusicBar from "./components/ui/progress-bar";
import SongCircles from "./components/ui/songcircle";
import StyledControlls from "./components/ui/styled-controls";

type Timeframe = "overall" | "monthly" | "weekly";

export default function MusicPlayerScreen() {
  const { timeframe, songid } = useParams<{
    timeframe: Timeframe;
    songid: string;
  }>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentDisplaySong = currentlyPlaying || songid;
  const audioTitle = songs.find((song) => song.id === currentDisplaySong)?.name;
  const artistName = songs.find(
    (song) => song.id === currentDisplaySong,
  )?.artist_name;
  const audioImage = songs.find(
    (song) => song.id === currentDisplaySong,
  )?.album_image;

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

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

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!audioRef.current || duration === 0) return;

      const seekPercentage = parseFloat(e.target.value);
      const seekTime = (seekPercentage / 100) * duration;

      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    },
    [duration],
  );

  const playSong = useCallback(
    (song: Song) => {
      if (!audioRef.current) return;

      if (currentlyPlaying === song.id) {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);

        audioRef.current.src = song.audio;

        audioRef.current.addEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
        audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

        audioRef.current.play();
        setCurrentlyPlaying(song.id);
        setIsPlaying(true);
      }
    },
    [currentlyPlaying, handleLoadedMetadata, handleTimeUpdate],
  );
  useEffect(() => {
    async function autoplaySong() {
      if (!songs.length || !songid || !audioRef.current) return;

      // Only autoplay if nothing is currently playing
      if (currentlyPlaying) return;

      const currentSong = songs.find((song) => song.id === songid);
      if (!currentSong) return;

      playSong(currentSong);
    }

    autoplaySong();
  }, [songs, songid, playSong, currentlyPlaying]);

  useEffect(() => {
    const audioElement = audioRef.current;
    return () => {
      if (audioElement) {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [handleLoadedMetadata, handleTimeUpdate]);

  const getNextSong = useCallback(() => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentlyPlaying,
    );

    if (currentIndex === -1) return null;

    const nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;

    return songs[nextIndex];
  }, [songs, currentlyPlaying]);

  const getPreviousSong = useCallback(() => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentlyPlaying,
    );

    if (currentIndex === -1) return null;

    const previousIndex =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;

    return songs[previousIndex];
  }, [songs, currentlyPlaying]);

  const handleNext = useCallback(() => {
    const nextSong = getNextSong();
    if (nextSong) {
      playSong(nextSong);
    }
  }, [getNextSong, playSong]);

  const handlePrevious = useCallback(() => {
    const previousSong = getPreviousSong();
    if (previousSong) {
      playSong(previousSong);
    }
  }, [getPreviousSong, playSong]);

  return (
    <StyledLandingPage>
      <GlobalStyles></GlobalStyles>
      <ContentContainer>
        <StyledPContainer>
          {audioTitle}
          <br />
          {artistName}
        </StyledPContainer>
        <SongCircles>
          <StyledImgContainer src={audioImage} />
        </SongCircles>

        <AudioDisplay ref={audioRef} style={{ display: "none" }}></AudioDisplay>
        <MusicBar
          type="range"
          value={progressPercentage}
          min={0}
          max={100}
          onChange={handleSeek}
        ></MusicBar>
        <Controls>
          <StyledControlls onClick={handlePrevious}>
            <FontAwesomeIcon icon={faBackward} />
          </StyledControlls>
          <StyledControlls
            onClick={() => {
              const currentSong = songs.find((song) => song.id === songid);
              if (currentSong) playSong(currentSong);
            }}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </StyledControlls>
          <StyledControlls onClick={handleNext}>
            <FontAwesomeIcon icon={faForward} />
          </StyledControlls>
        </Controls>
      </ContentContainer>
    </StyledLandingPage>
  );
}
