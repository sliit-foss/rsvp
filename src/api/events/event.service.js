import Event from './event.model';
import ImageUpload from '../../middleware/ImageUpload';

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
const deleteEventById = (id) => Event.findByIdAndDelete(id);

export default {
  createEvent,
  getEventById,
  getAllEvents,
  updateEventByID,
  deleteEventById,
};
