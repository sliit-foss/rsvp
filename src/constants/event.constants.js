/**
 * The status an event can be in
 * @type {{HAPPENING: string, UPCOMING: string, CLOSED: string, CANCELLED: string, POSTPONED: string}}
 */
const EVENT_STATUS = {
  PENDING: 'Pending',
  HAPPENING: 'Happening Now',
  UPCOMING: 'Upcoming',
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled',
  POSTPONED: 'Postponed',
};

export { EVENT_STATUS };
