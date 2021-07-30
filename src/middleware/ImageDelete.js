import admin from 'firebase-admin';

const ImageDelete = async (imageURL) => {
  const pathArray = imageURL
    .replaceAll('%20', ' ')
    .replaceAll('%2F', '/')
    .split('?')[0]
    .split('/')
    .reverse();
  const imagePath = `${pathArray[2]}/${pathArray[1]}/${pathArray[0]}`;
  await admin.storage().bucket().file(imagePath).delete();
};

export default ImageDelete;
