export function determineContentReadiness(
    weightTimeSpent,
    weightPageClicks,
    weightScrollPercentage,
    totalTimeSpent,
    totalPagesAccessed,
    endTime,
    startTime,
    totalPageClicks,
    totalScrollDistance,
    totalPageHeight,
    pagesAccessed,
    totalPages,
    averageReadingTimePerPage
  ) {
    // Calculate Engagement Score
    const engagementScore = (
      weightTimeSpent * (totalTimeSpent / totalPagesAccessed)
    ) + (weightPageClicks * totalPageClicks) + (
      weightScrollPercentage * ((totalScrollDistance / totalPageHeight) * (totalPagesAccessed / 100))
    );
  
    // Calculate 45% Content Accesses
    const contentAccessPercentage = (pagesAccessed / totalPages) * 100;
  
    // Calculate Predicted Reading Time
    const predictedReadingTime = averageReadingTimePerPage * totalPagesAccessed;
  
    // Check if Engagement Score is above threshold and content access exceeds 45%
    const isContentRead = engagementScore >= 0.5 && contentAccessPercentage >= 45;
  
    // Return both scores and content readiness status
    return {
      engagementScore,
      contentAccessPercentage,
      predictedReadingTime,
      isContentRead,
    };
  }