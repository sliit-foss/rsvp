import { validateRequest } from '../../utils/requestValidator';
import Event from '../events/event.model';

/**
 *
 * @param id
 * @param body
 * @returns {Query<Document | null, Document>}
 */
const attendEvent = async (id, body) => {
  const event = await Event.findById(id);
  if (!event) {
    throw { message: `Event not found with id:${id}` };
  }
  const attendees = event.attendees || [];
  if (event.status !== 'Upcoming') {
    throw { message: 'Registrations closed for this event' };
  }
  if (event.capacity === attendees.length) {
    throw { message: 'Event capacity reached' };
  }
  const emailChecklist = attendees.filter((attendee) => {
    return attendee.email == body.email;
  });
  if (emailChecklist.length) {
    throw { message: 'Email has already been registered' };
  }
  
  attendees.push(body);

  body = {
    attendeeCount: (event.attendeeCount += 1),
    attendees: attendees,
  };

  return await Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: false,
  });
};

/**
 *
 * @param id
 * @param user
 * @returns {Query<Array<Document>, Document>}
 */
const getAttendees = async (id, user) => {
  const event = await Event.findById(id);
  validateRequest(
    event,
    user,
    'You can only view attendees of events published by your faculty'
  );
  const results = await Event.findById(id).select(['attendees']);
  if (!results) {
    throw { message: `Event not found with id:${id}` };
  }
  return results.attendees;
};

export default {
  attendEvent,
  getAttendees,
};
