import Attendee from './attendee.modal';

/**
 * Create event in db
 * @param firstName
 * @param lastName
 * @param email
 * @param contactNo
 * @param previlege
 * @returns {Promise<Document<any>>}
 */

const createAttendee = ({
  firstName,
  lastName,
  email,
  contactNo,
  previlege,
}) => {
  const attendee = new Attendee({
    firstName,
    lastName,
    email,
    contactNo,
    previlege,
  });

  return attendee.save();
};

/**
 *
 * @param id
 * @returns {Query<Document | null, Document>}
 */

const getAttendeeById = (id) => Attendee.findById(id);

/**
 *
 * @param perpage
 * @param page
 * @returns {Query<Array<Document>, Document>}
 */

const getAllAttendees = (perpage, page) =>
  Attendee.find()
    .limit(parseInt(perpage))
    .skip((parseInt(page) - 1) * parseInt(page));

export default {
  createAttendee,
  getAttendeeById,
  getAllAttendees,
};
