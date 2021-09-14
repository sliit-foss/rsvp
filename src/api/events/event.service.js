import Event from './event.model';
import {
  EVENT_STATUS,
  getEventStatus,
  uploadSpeakerPhotos,
} from './event.constants';
import { ImageUpload, ImageDelete } from '../../middleware/firebaseStorage';
import { validateRequest } from '../../utils/requestValidator';
import MailService from '../mails/mail.service';
import ClientConst from '../mails/mail.constants';

/**
 * Create event in db
 * @param name
 * @param description
 * @param headerImage
 * @param venue
 * @param startTime
 * @param endTime
 * @param status
 * @param category
 * @param speakers
 * @param capacity
 * @param tags
 * @param createdBy
 * @param joinLink
 * @param host
 * @returns {Promise<Document<any>>}
 */
const createEvent = async (
  {
    name,
    description,
    headerImage,
    venue,
    startTime,
    endTime,
    status,
    category,
    speakers,
    capacity,
    tags,
    joinLink,
    host,
  },
  createdBy
) => {
  headerImage = await ImageUpload(headerImage, `${name}/headerImage`);
  speakers = await uploadSpeakerPhotos(speakers, name);

  if (
    status !== EVENT_STATUS.CANCELLED &&
    status !== EVENT_STATUS.POSTPONED &&
    status !== EVENT_STATUS.CLOSED
  ) {
    status = getEventStatus(startTime, endTime);
  }

  const event = new Event({
    name,
    description,
    headerImage,
    venue,
    startTime,
    endTime,
    status,
    category,
    speakers,
    capacity,
    tags,
    createdBy,
    host,
    joinLink,
    createdBy,
  });

  return event.save();
};

/**
 *
 * @param id
 * @returns {Query<Document | null, Document>}
 */
const getEventById = (id) => Event.findById(id).select(['-attendees']);

/**
 *
 * @param perpage
 * @param page
 * @returns {Query<Array<Document>, Document>}
 */
const getAllEvents = async (perpage, page) => {
  await Event.find(async function (err, events) {
    if (!err) {
      events.map(async function (event) {
        if (
          event.status !== EVENT_STATUS.CANCELLED &&
          event.status !== EVENT_STATUS.POSTPONED &&
          event.status !== EVENT_STATUS.CLOSED
        ) {
          event.status = getEventStatus(event.startTime, event.endTime);
          event.save();
        }
      });
    }
  });
  return await Event.find()
    .sort({ startTime: -1 })
    .limit(parseInt(perpage))
    .skip((parseInt(page) - 1) * parseInt(page))
    .select(['-speakers', '-photos', '-tags', '-attendees']);
};

/**
 *
 * @returns {Query<Array<Document>, Document>}
 */
const getLatestEvents = async () => {
  const results = await Event.find()
    .or([{ status: 'Happening Now' }, { status: 'Upcoming' }])
    .sort({ status: 1, startTime: 1 })
    .select(['-attendees', '-speakers'])
    .limit(3);

  if (!results.length) {
    const event = await Event.findOne()
      .sort({ startTime: -1 })
      .select(['-attendees', '-speakers']);
    if (event) {
      return [event];
    }
  } else {
    return results;
  }
};

/**
 *
 * @param id
 * @param body
 * @param user
 * @returns {Query<Document | null, Document>}
 */
const updateEventByID = async (id, body, user) => {
  const event = await Event.findById(id);
  validateRequest(
    event,
    user,
    'You can only make changes to events published by your faculty'
  );
  if (body.speakers && body.speakers.length == 0) {
    throw {
      message: 'There needs to be at least one speaker',
    };
  }
  const eventName = body.name
    ? body.name
    : (await Event.findById(id).select(['name'])).name;

  if (body.headerImage && body.headerImage != event.headerImage) {
    body.headerImage = await ImageUpload(
      body.headerImage,
      `${eventName}/headerImage`
    );
  }

  if (body.speakers) {
    body.speakers = await uploadSpeakerPhotos(body.speakers, eventName);
  }

  if(body.joinLink){
    const attendees = event.attendees;
    await Promise.all(
      attendees.map(async function (attendee) {
        var mailOptions = {
          from: ClientConst.CREDENTIALS.USER,
          to: attendee.email,
          subject: `${event.name} - Updated Join Link`,
          text: `Hi ${attendee.name}!
      
Please note that the meeting link for ${event.name} has been updated.
Updated Meeting Link : - ${body.joinLink}
We look foward to seeing you there!
      
Regards,
SLIIT ${event.createdBy}.
          `,
        };
        await MailService.sendMail(mailOptions);
      })
    );
  }

  return await Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: false,
  });
};

/**
 *
 * @param id
 * @param user
 * @returns {Query<Document | null, Document>}
 */
const deleteEventById = async (id, user) => {
  const event = await Event.findById(id);
  validateRequest(
    event,
    user,
    'You can only delete events published by your faculty'
  );
  return await Event.findById(id, async function (err, event) {
    if (!err) {
      try {
        await ImageDelete(event.headerImage);
        event.speakers.map(async function (speaker) {
          await ImageDelete(speaker.photo);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(err);
    }
    event.remove();
  });
};
export default {
  createEvent,
  getEventById,
  getAllEvents,
  getLatestEvents,
  updateEventByID,
  deleteEventById,
};
