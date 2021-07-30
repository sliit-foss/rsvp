import Event from './event.model';
import {ImageUpload,ImageDelete} from '../../middleware/FirebaseStorage';

/**
 * Create event in db
 * @param name
 * @param description
 * @param headerImage
 * @param photos
 * @param venue
 * @param date
 * @param fromTime
 * @param toTime
 * @param status
 * @param category
 * @param speakers
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
    date,
    fromTime,
    toTime,
    status,
    category,
    speakers,
    host,
  },
  createdBy
) => {
  if (isNaN(Date.parse(date))) {
    throw {
      message: 'invalid date format. please use yyyy-mm-dd or mm-dd-yyyy',
    };
  }

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
    date,
    fromTime,
    toTime,
    status,
    category,
    speakers,
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
const getAllEvents = (perpage, page) =>
  Event.find()
    .sort({ date: -1 })
    .limit(parseInt(perpage))
    .skip((parseInt(page) - 1) * parseInt(page));

/**
 *
 * @returns {Query<Document | null, Document>}
 */
const getLatestEvent = () => {
  return Event.findOne().sort({ date: -1 });
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
