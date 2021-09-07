import Notice from './notice.model';
import { validateFCSCRequest } from '../../utils/requestValidator';
import { ImageUpload, ImageDelete } from '../../middleware/firebaseStorage';

/**
 * Create notice in db
 * @param req
 * @returns {Promise<Document<any>>}
 */

const addNotice = async (req, title, body, category, photo) => {
  validateFCSCRequest(req);
  if (photo) {
    photo = await ImageUpload(photo, `noticeBanners/${title + ' ' + category}`);
  }
  const notice = new Notice({
    title,
    body,
    category,
    photo,
  });

  return notice.save();
};

/**
 *
 * @param req
 * @returns {Promise<void>}
 */
const editNotice = async (req) => {
  validateFCSCRequest(req);
  const notice = await Notice.findById(req.params.id);
  if (req.body.photo != notice.photo) {
    req.body.photo = await ImageUpload(
      req.body.photo,
      `noticeBanners/${req.body.title + ' ' + req.body.category}`
    );
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
const deleteNotice = async (req) => {
  validateFCSCRequest(req);
  const notice = await Notice.findById(req.params.id);
  if (notice.photo.includes('https://firebasestorage.googleapis.com')) {
    await ImageDelete(notice.photo);
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
