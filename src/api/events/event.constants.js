import { ImageUpload } from '../../middleware/firebaseStorage';

/**
 * The status an event can be in
 * @type {{HAPPENING: string, UPCOMING: string, CLOSED: string, CANCELLED: string, POSTPONED: string}}
 */
const EVENT_STATUS = {
  HAPPENING: 'Happening Now',
  UPCOMING: 'Upcoming',
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled',
  POSTPONED: 'Postponed',
};

const getEventStatus = (startTime, endTime) => {
  const currentTime = Date.now();

  if (currentTime < startTime) {
    return 'Upcoming';
  } else if (currentTime > startTime && currentTime < endTime) {
    return 'Happening Now';
  } else {
    return 'Closed';
  }
};

const uploadEventPhotos = async (photos, name) => {
  return await Promise.all(
    photos.map(async function (photo, index) {
      await ImageUpload(photo, `${name}/photo` + index.toString()).then(
        (imageURL) => (photo = imageURL)
      );
      return photo;
    })
  );
};

const uploadSpeakerPhotos = async (speakers, name) => {
  return await Promise.all(
    speakers.map(async function (speaker, index) {
      await ImageUpload(
        speaker.photo,
        `${name}/speaker` + index.toString()
      ).then((imageURL) => (speaker.photo = imageURL));
      return speaker;
    })
  );
};

export { EVENT_STATUS, getEventStatus, uploadEventPhotos, uploadSpeakerPhotos };
