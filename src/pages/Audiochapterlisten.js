import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/player.css';
import AudioPlayer from 'react-modern-audio-player';
import { useParams, useNavigate } from 'react-router-dom';
import { analytics, logEvent } from '../firebase.js';
import { Helmet } from 'react-helmet';
import LinearProgress from '@mui/material/LinearProgress';
import {
  FaPlay,
  FaPause,
  FaArrowLeft,
  FaMoon,
  FaSun,
} from 'react-icons/fa';

// Tailwind CSS
import {
  Box,
  Flex,
  Button,
  Image,
  useColorMode,
} from '@chakra-ui/react';

// MUI

const AudioChapterListen = () => {
  const [audiobook, setAudiobook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [seek, setSeek] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const PROGRESS_STORAGE_KEY = 'audioChapterProgress';

  const defaultCoverImage = "/yeeplatform_book_cover.png";

  useEffect(() => {
    logEvent(analytics, 'audiochapter_listen_page_visited');
    

    const fetchAudiobookData = async () => {
      try {
        const response = await axios.get(
          `https://yeeplatformbackend.azurewebsites.net/getAudioChapter/${id}`
        );
        setAudiobook(response.data);
        console.log("my data");
        console.log(response.data);
        logEvent(analytics, audiobook?.title + '_listen_visited');
        // Fetch saved progress for this chapter
        const savedProgress = localStorage.getItem(
          PROGRESS_STORAGE_KEY + `_${id}`
        );
        if (savedProgress) {
          setSeek(parseFloat(savedProgress));
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobookData();
  }, [id]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      localStorage.setItem(PROGRESS_STORAGE_KEY + `_${id}`, seek);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeekChange = (e) => {
    setSeek(parseFloat(e.target.value));
    localStorage.setItem(PROGRESS_STORAGE_KEY + `_${id}`, seek);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const onEnd = () => {
    console.log('Audio ended');
    if (seek >= audiobook?.content.duration * 0.95) {
      // Mark chapter as completed (logic based on your requirements)
    }
    localStorage.removeItem(PROGRESS_STORAGE_KEY + `_${id}`); // No need to store progress anymore
  };

  const renderPlayer = () => {
    if (!audiobook || !audiobook.audio_file) {
      return <p>No audio files available for this book.</p>;
    }

    const audioFile = audiobook.audio_file;

    return (
      <Box>
        <Helmet>
  <title>{audiobook.title} - Yee FM</title>
  <meta name="description" content={audiobook.description} />
  <meta name="keywords" content={`${audiobook.title}, audio chapter, listen, audio, literature, Yee FM`} />
  <link rel="icon" href={audiobook.coverimage || defaultCoverImage|| defaultCoverImage} />
  <meta property="og:title" content={`${audiobook.title} - Yee FM`} />
  <meta property="og:description" content={audiobook.description} />
  <meta property="og:image" content={audiobook.coverimage || defaultCoverImage} />
  <meta property="og:url" content={`https://www.yeefm.com/audiochapters/${id}/listen`} />
  <meta property="og:type" content="website" />
</Helmet>

         <AudioPlayer
          playList={[
            {
              name: audiobook.title,
              writer: audiobook.author,
              img: audiobook.coverimage && audiobook.coverimage.endsWith("undefined") ? defaultCoverImage : audiobook.coverimage || defaultCoverImage,
              src: audiobook.audio_file,
              id: 1,
            },
          ]}
          audioInitialState={{
            isPlaying,
            volume,
            curPlayId: 1,
          }}
          activeUI={{
            all: true,
            progress: 'waveform',
          }}
          customIcons={{
            play: <FaPlay />,
            pause: <FaPause />,
            // Add custom icons as needed
          }}
          placement={{
            interface: {
              templateArea: {
                trackTimeDuration: 'row2-5',
                progress: 'row3-4',
                playButton: 'row2-6',
                repeatType: 'row2-7',
                volume: 'row2-8',
              },
            },
            player: 'bottom-left',
          }}
          onPlay={() => console.log('Audio started playing')}
          onPause={() => console.log('Audio paused')}
          onEnd={() => console.log('Audio ended')}
        />
      </Box>
    );
  };

  const { colorMode, toggleColorMode } = useColorMode();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading audiobook: {error.message}</div>;
  }

  return (
    <Box
      className={isDarkMode ? 'bg-black text-white' : 'bg-yellow-200'}
      h="100vh"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        h="100%"
      >
        <Flex alignItems="center" mt={2}>
          <Button
            onClick={handleGoBack}
            className="text-2xl text-yellow-800 mr-2"
          >
            <FaArrowLeft />
          </Button>
          <h1 className="text-3xl font-bold text-yellow-800 mt-2 mb-2">
            {audiobook ? audiobook.title : 'No title available'}
          </h1>
        </Flex>

        <Flex alignItems="center" justifyContent="center" mt={4}>
          <Button
            onClick={handleDarkMode}
            className={
              isDarkMode
                ? 'bg-yellow-800 text-white p-2 rounded-full mr-2'
                : 'bg-yellow-800 text-white p-2 rounded-full mr-2'
            }
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </Button>
        </Flex>

        <Image
  src={audiobook.coverimage && audiobook.coverimage.endsWith("undefined") ? defaultCoverImage : audiobook.coverimage || defaultCoverImage}
  alt="Cover"
  w={200}
  h={300}
  objectFit="cover"
  borderRadius="md"
  className="rounded-lg shadow-lg transition-transform hover:shadow-xl transform hover:scale-105 mt-3"
/>



        {renderPlayer()}

        {/* Add more audiobook details and player controls as needed */}
      </Flex>
    </Box>
  );
};


export default AudioChapterListen;
