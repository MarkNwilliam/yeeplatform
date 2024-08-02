import React, { useState, useEffect, Suspense, lazy } from 'react';
const Joyride = lazy(() => import('react-joyride')); // Lazy load Joyride
const STATUS = {
  FINISHED: 'finished',
  SKIPPED: 'skipped'
};

function PointsTourGuide({ runTour, setRunTour }) {
  const [tourCompleted, setTourCompleted] = useState(false);
  const [isUILoaded, setIsUILoaded] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem('tourCompleted');
    if (tourCompleted) {
      setTourCompleted(true);
    }
  }, []);

  useEffect(() => {
    // Simulate a delay for UI loading
    const timer = setTimeout(() => {
      setIsUILoaded(true);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  const handleTourCallback = ({ status }) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      localStorage.setItem('tourCompleted', 'true');
    }
  };

  if (tourCompleted || !isUILoaded) {
    return null; // Don't render the tour guide if it's already completed or the UI is not loaded
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Joyride steps={steps} run={runTour} callback={handleTourCallback} />
    </Suspense>
  );
}

export default PointsTourGuide;