import Event from './event.model';
import { EVENT_STATUS, getEventStatus } from './event.constants';
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
    tags,
    host,
  },
  createdBy
) => {
  headerImage = await ImageUpload(headerImage, `${name}/headerImage`);

  photos = await Promise.all(
    photos.map(async function (photo, index) {
      await ImageUpload(photo, `${name}/photo` + index.toString()).then(
        (imageURL) => (photo = imageURL)
      );
      return photo;
    })
  );

  speakers = await Promise.all(
    speakers.map(async function (speaker, index) {
      await ImageUpload(
        speaker.photo,
        `${name}/speaker` + index.toString()
      ).then((imageURL) => (speaker.photo = imageURL));
      return speaker;
    })
  );

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
    .select(['-speakers', '-photos', '-tags']);
};

/**
 *
 * @returns {Query<Document | null, Document>}
 */
const getLatestEvent = () => {
  return Event.findOne().sort({ startTime: -1 });
};

/**
 *
 * @param id
 * @param body
 * @returns {Query<Document | null, Document>}
 */
const updateEventByID = (id, body) =>
  Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: false,
  });

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

export default {
  createEvent,
  getEventById,
  getAllEvents,
  getLatestEvent,
  updateEventByID,
  deleteEventById,
};
