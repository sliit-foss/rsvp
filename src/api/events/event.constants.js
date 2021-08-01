/**
 * The status an event can be in
 * @type {{HAPPENING: string, UPCOMING: string, CLOSED: string, CANCELLED: string, POSTPONED: string}}
 */
const EVENT_STATUS = {
  HAPPENING: 'Happening Now',
  UPCOMING: 'Upcoming',
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled',
  POSTPONED: 'Postponed',
};

const getEventStatus = (startTime, endTime) => {
  const currentTime = Date.now();

  if (currentTime < startTime) {
    return 'Upcoming';
  } else if (currentTime > startTime && currentTime < endTime) {
    return 'Happening Now';
  } else {
    return 'Closed';
  }
};

export { EVENT_STATUS, getEventStatus };
