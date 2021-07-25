import Event from "./event.model";
import ImageUpload from "../../middleware/ImageUpload";

/**
 * Create event in db
 * @param name
 * @param description
 * @param headerImage
 * @param photos
 * @param venue
 * @param fromDate
 * @param toDate
 * @param status
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
  headerImage = await ImageUpload(headerImage, `${name}/headerImage`);

  for (let i = 0; i < photos.length; i++) {
    const imageURL = await ImageUpload(
      photos[i],
      `${name}/photo` + i.toString()
    );
    photos[i] = imageURL;
  }

  for (let j = 0; j < speakers.length; j++) {
    const imageURL = await ImageUpload(
      speakers[j].photo,
      `${name}/speaker` + j.toString()
    );
    speakers[j].photo = imageURL;
  }

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
    .limit(parseInt(perpage))
    .skip((parseInt(page) - 1) * parseInt(page));

export default {
  createEvent,
  getEventById,
  getAllEvents,
};
