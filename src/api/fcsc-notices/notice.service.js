import Notice from './notice.model';
import { validateRequest } from './notice.constants';

/**
 * Create notice in db
 * @param req
 * @returns {Promise<Document<any>>}
 */

const addNotice = async (req) => {
  validateRequest(req);
  const { title, body, category } = req.body;

  const notice = new Notice({
    title,
    body,
    category,
  });

  return notice.save();
};

/**
 *
 * @param req
 * @returns {Promise<void>}
 */
const editNotice = (req) => {
  validateRequest(req);
  return Notice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });
};

/**
 *
 * @param req
 * @returns {Promise<void>}
 */
const deleteNotice = (req) => {
  validateRequest(req);
  return Notice.findByIdAndDelete(req.params.id);
};

/**
 *
 * @param req
 * @returns {Promise<void>}
 */
const getNotices = () => {
  return Notice.find();
};

export default {
  addNotice,
  editNotice,
  deleteNotice,
  getNotices,
};
