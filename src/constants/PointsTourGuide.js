// PointsTourGuide.js

import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride'; // Update the import statement

function PointsTourGuide({ runTour, setRunTour }) {
  const [tourCompleted, setTourCompleted] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem('tourCompleted');
    if (tourCompleted) {
      setTourCompleted(true);
    }
  }, []);

  const handleTourCallback = ({ status }) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      localStorage.setItem('tourCompleted', 'true');
    }
  };

  if (tourCompleted) {
    return null; // Don't render the tour guide if it's already completed
  }

  const steps = [
    {
      target: '.points-info',
      content: 'Earn points by reading! You can use these points to access premium content for free.',
    },
    {
        target: '.user-points', // Assuming you have a class named 'user-points' for the element displaying user points
        content: 'Here you can see your total points. that you earn after reading and listening to your content 😊',
    },
    // Add more steps as needed
  ];

  return <Joyride steps={steps} run={runTour} callback={handleTourCallback} />;
}

export default PointsTourGuide;
