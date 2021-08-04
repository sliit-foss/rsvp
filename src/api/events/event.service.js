import Event from './event.model';
import {
  EVENT_STATUS,
  getEventStatus,
  uploadEventPhotos,
  uploadSpeakerPhotos,
} from './event.constants';
import { ImageUpload, ImageDelete } from '../../middleware/firebaseStorage';

/**
 * Create event in db
 * @param name
 * @param description
 * @param headerImage
 * @param photos
 * @param venue
 * @param startTime
 * @param endTime
 * @param status
 * @param category
 * @param speakers
 * @param capacity
 * @param tags
 * @param createdBy
 * @param host
 * @returns {Promise<Document<any>>}
 */
const createEvent = async (
  {
    name,
    description,
    headerImage,
    photos,
    venue,
    startTime,
    endTime,
    status,
    category,
    speakers,
    capacity,
    tags,
    host,
  },
  createdBy
) => {
  headerImage = await ImageUpload(headerImage, `${name}/headerImage`);
  photos = await uploadEventPhotos(photos, name);
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
    photos,
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
    createdBy,
  });

  return event.save();
};

/**
 *
 * @param id
 * @returns {Query<Document | null, Document>}
 */
const getEventById = (id) => Event.findById(id);

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
    .limit(3);

  if (!results.length) {
    return Event.findOne().sort({ startTime: -1 });
  } else {
    return results;
  }
};

/**
 *
 * @param id
 * @param body
 * @returns {Query<Document | null, Document>}
 */
const updateEventByID = async (id, body) => {
  const eventName = body.name
    ? body.name
    : (await Event.findById(id).select(['name'])).name;

  if (body.headerImage) {
    body.headerImage = await ImageUpload(
      body.headerImage,
      `${eventName}/headerImage`
    );
  }

  if (body.photos) {
    body.photos = await uploadEventPhotos(body.photos, eventName);
  }

  if (body.speakers) {
    body.speakers = await uploadSpeakerPhotos(body.speakers, eventName);
  }

  return await Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: false,
  });
};

/**
 *
 * @param id
 * @returns {Query<Document | null, Document>}
 */
const deleteEventById = async (id) =>
  Event.findById(id, async function (err, event) {
    if (!err) {
      await ImageDelete(event.headerImage);

      event.photos.map(async function (photo) {
        await ImageDelete(photo);
      });

      event.speakers.map(async function (speaker) {
        await ImageDelete(speaker.photo);
      });
    } else {
      console.log(err);
    }
    event.remove();
  });

/**
 *
 * @param id
 * @param body
 * @returns {Query<Document | null, Document>}
 */
const registerAttendee = async (id, body) => {
  const event = await Event.findById(id);
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
    attendees: attendees,
  };

  return await Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: false,
  });
};

export default {
  createEvent,
  getEventById,
  getAllEvents,
  getLatestEvents,
  updateEventByID,
  deleteEventById,
  registerAttendee,
};
