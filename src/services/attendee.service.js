import fs from 'fs';
import handlebars from 'handlebars';
import ClientConst from '../constants/mail.constants';
import { validateRequest } from '../middleware/requestValidator';
import Event from '../models/event.model';
import MailService from './mail.service';

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

  if (event.joinLink) {
    let eventDate = new Date(event.startTime);
    eventDate = eventDate
      .toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
      .replace(',', ' ');

    const html = fs.readFileSync(`${global.__basedir}/html/emailTemplate.html`, 'utf8');

    const template = handlebars.compile(html);
    const replacements = {
      title: 'JOIN LINK',
      username: '',
      text: `Thank you for registering for ${event.name}. Please use the following link to join us on the scheduled date ( ${eventDate} ). We look foward to seeing you there!`,
      boxText: event.joinLink,
      buttonURL: event.joinLink,
      buttonText: 'Join'
    };
    const htmlToSend = template(replacements);

    const mailOptions = {
      from: ClientConst.CREDENTIALS.USER,
      to: body.email,
      subject: `${event.name} Join Link`,
      html: htmlToSend
    };
    await MailService.sendMail(mailOptions);
  }

  attendees.push(body);

  body = {
    attendeeCount: (event.attendeeCount += 1),
    attendees: attendees
  };

  return Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: false
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
  validateRequest(event, user, 'You can only view attendees of events published by your faculty');
  const results = await Event.findById(id).select(['attendees']);
  if (!results) {
    throw { message: `Event not found with id:${id}` };
  }
  return results.attendees;
};

export default {
  attendEvent,
  getAttendees
};
