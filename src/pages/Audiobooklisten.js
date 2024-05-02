import React, { useState, useEffect, useRef } from 'react';
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
import LinearProgress from '@mui/material/LinearProgress';

// Tailwind CSS
import {
  Box,
  Flex,
  Button,
  Image,
} from '@chakra-ui/react';
import { analytics, logEvent } from '../firebase.js';
import { Helmet } from 'react-helmet';

// MUI

const AudiobookListen = () => {
  const [audiobook, setAudiobook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [listened, setListened] = useState(false);
  const [audiobookId, setAudiobookId] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
   
    const fetchAudiobookData = async () => {
      try {
        const response = await axios.get(
          `https://yeeplatformbackend.azurewebsites.net/getAudiobook/${id}`
        );
        const { data } = response;
        console.log("here is the data");
        console.log(data);
        setAudiobook(data);
        setAudiobookId(id);
        logEvent(analytics, audiobook.title + '_listen_visited');
        setAudioDuration(data.audioDuration);
       
        const savedProgress = localStorage.getItem(
          `audiobook_${audiobookId}_progress`
        );
        if (savedProgress) {
          setProgress(parseFloat(savedProgress));
        }
        logEvent('audiobook_detail_fetched', { audiobookId: id });
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobookData();
  }, [id]);

  useEffect(() => {
    if (audiobookId) {
      localStorage.setItem(`audiobook_${audiobookId}_progress`, progress);

    }
  }, [audiobookId, progress]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleGoBack = () => {
    navigate(`/audiobooks/${id}`);  // Navigate to the previous page
  };

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleProgressChange = (time) => {
    if (time >= progress) {
      if (time >= audioDuration * 0.45 && !listened) {
        setListened(true);
      }
      setProgress(time);
    }
  };
  

  if (loading) {
    return <div><LinearProgress className="text-yellow-500 animate-pulse" color="secondary" /></div>;
  }

  if (error) {
    console.log(error.message) ;
  }

  return (
    <Box
      className={isDarkMode ? 'bg-black text-white' : 'bg-yellow-200'}
      h="100vh"
    >
      <Helmet>
        <title>{audiobook.title} - Yee FM</title>
        <meta name="description" content={audiobook.description} />
        <meta
          name="keywords"
          content={`${audiobook.title}, audiobooks, listen, audio, literature, Yee FM`}
        />
        <link
          rel="icon"
          href={
            audiobook.coverImage ||
            audiobook.coverimage ||
            'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp'
          }
        />
        <meta
          property="og:title"
          content={`${audiobook.title} - Yee FM`}
        />
        <meta property="og:description" content={audiobook.description} />
        <meta
          property="og:image"
          content={
            audiobook.coverImage ||
            audiobook.coverimage ||
            'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp'
          }
        />
        <meta
          property="og:url"
          content={`https://www.yeefm.com/audiobooks/${id}/listen`}
        />
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

        <AudioPlayer
          ref={playerRef}
          playList={audiobook.audio_files.map((file, index) => ({
            name: `${audiobook.title} - Part ${index + 1}`,
            writer: audiobook.author,
            img: audiobook.coverImage,
            src: file,
            id: index + 1,
          }))}
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
          onPlay={handlePlayPause}
          onPause={handlePlayPause}
          onEnd={handlePlayPause}
          onTimeUpdate={handleProgressChange}
        />
      </Flex>
    </Box>
  );
};

export default AudiobookListen;
