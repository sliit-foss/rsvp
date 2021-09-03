import Notice from './notice.model';

/**
 * Create notice in db
 * @param req
 * @returns {Promise<Document<any>>}
 */

const addNotice = async (req) => {
  if (req.user.role != 'Admin' && req.user.faculty != 'FCSC') {
    throw { message: 'You are not authorized to access this endpoint' };
  }
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
    if (req.user.role != 'Admin' && req.user.faculty != 'FCSC') {
      throw { message: 'You are not authorized to access this endpoint' };
    }
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
  if (req.user.role != 'Admin' && req.user.faculty != 'FCSC') {
    throw { message: 'You are not authorized to access this endpoint' };
  }
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
