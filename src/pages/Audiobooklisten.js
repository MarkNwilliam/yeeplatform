import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioPlayer from 'react-modern-audio-player';
import { useParams, useNavigate } from 'react-router-dom';
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
  Text,
  Image,
  useColorMode,
} from '@chakra-ui/react';
import { logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';

// MUI
import { Slider, Switch } from '@mui/material';

const AudiobookListen = () => {
  const [audiobook, setAudiobook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [seek, setSeek] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    logEvent(audiobook.title+'_listen_visited');
    const fetchAudiobookData = async () => {
      try {
        const response = await axios.get(
          `https://yeeplatformbackend.azurewebsites.net/getAudiobook/${id}`
        );
        setAudiobook(response.data);
        logEvent('audiobook_detail_fetched', { audiobookId: id });
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
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeekChange = (e) => {
    setSeek(parseFloat(e.target.value));
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderPlayer = () => {
    if (!audiobook || !audiobook.audioUrl) {
      return <p>No audio files available for this book.</p>;
    }

    const audioFile = audiobook.audioUrl;

    return (
      <Box>
   

         <AudioPlayer
          playList={[
            {
              name: audiobook.title,
              writer: audiobook.author,
              img: audiobook.coverImage,
              src: audioFile,
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

<Helmet>
  <title>{audiobook.title} - Yee FM</title>
  <meta name="description" content={audiobook.description} />
  <meta name="keywords" content={`${audiobook.title}, audiobooks, listen, audio, literature, Yee FM`} />
  <link rel="icon" href={audiobook.coverImage || audiobook.coverimage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
  <meta property="og:title" content={`${audiobook.title} - Yee FM`} />
  <meta property="og:description" content={audiobook.description} />
  <meta property="og:image" content={audiobook.coverImage || audiobook.coverimage || "https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"} />
  <meta property="og:url" content={`https://www.yeefm.com/audiobooks/${id}/listen`} />
  <meta property="og:type" content="website" />
</Helmet>

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
  src={audiobook.coverImage}
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

export default AudiobookListen;