import Event from './event.model';

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
const createEvent = ({
                         name, description, headerImage,
                         photos, venue, fromDate, toDate,
                         status, speakers, createdBy, host
}) => {
    const event = new Event({
        name, description, headerImage,
        photos, venue, fromDate, toDate,
        status, speakers, createdBy, host
    });

    return event.save();
};

const getEventById = id => Event.findById(id);

export default {
    createEvent,
    getEventById
};
