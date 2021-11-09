require('dotenv').config();

export const MAIL = {
  HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
  USER: process.env.MAIL_USER || 'rsvptemporary@gmail.com',
  PASSWORD: process.env.MAIL_PASSWORD || 'A789x#123',
};

export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const VERSION = process.env.VERSION || '0.1.0';
export const SESSION_SECRET = process.env.SECRET || 'index.js:284@7';
export const PRIV_KEY = process.env.PRIV_KEY || 'fullterDc@';

/**
 * @constant DB_CONNECTION_STRING database connection string
 * @example mongodb://localhost:27017/db_name
 * 'mongodb://root:myfoss@localhost:27017/rsvp?authSource=admin'
 */
export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

/**
 * @constant DB_HOST hostname of database. Can be an IP or an URI.
 * @example localhost
 */
export const DB_HOST = process.env.DB_HOST || 'localhost';

export const SERVICE_ACCOUNT = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID || 'rsvp-dd222',
  private_key_id:
    process.env.FIREBASE_PRIVATE_KEY_ID ||
    '833376a5d5fc2b8efc5ac3e935a45275d8ccb8a6',
  private_key:
    process.env.FIREBASE_PRIVATE_KEY ||
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDT6FKDlf9PIbRa\n8W8cW4NzKmafNPNyjLCNyUA4jWFu60WweHQKSzhB5E9c6lvhg3LTQp+BLqQCHNxX\nN71p54AA4A1ECbQpRASChv33CI+eu26wKtpXcWOQqqaKLHoUB4V9L09ffX74F2z0\n2OiT0DBH3hZlhoYW3kvyfiJa6LQ1JLVDe7WxTzuCCVLzxUtnww0MyKPkA1/YxsMC\n9OnluzcVdXxxLZG8hC1ODE3ZK47pYeNp96fg8PHz+KW/cynlAg0g7PJ96TIOVAsI\neRZERhBGzAJZ6laCxSV9PSXy6BTZ6p5p7qc5421YKuJ/CPN8oWckPZSGOm8SpGPn\nw9SxyMrtAgMBAAECggEAYoycdzq2cgg0Nskqic8bel9BO5BmGaNJZp8uIT7LDckX\n72KNYM4rmyVBLW6GjYHS0GIfCPZ2as8eP+eZzNtPQdjxAm/a3AgYatW53X2bQVBc\nwUwkn98JVVmvuvnFSnRXBemPKdMUze8jClmoDDoZggrMcqnVyWPXgS5c7tdjG4Ue\nm3WQwDmgnIrbmr/7jyUzYHpUMQ2Xxbki8DUn0hCLpwmLQhfovhb94XedEl4hepFH\n1XgtA7tqhjGW5UdYVxHuQxDIdJ5JHZVMsKQ1+Gfg3RUIXjm5eM88r0TSJo8HKmRV\nvVLJ0Qgjz4H4EbTCrb2Cc7geDYWwbvsiDwmcPPA95wKBgQDu/7ILNqoqzA+IpswR\neGSy/vzyShJ+8AFL+rH4gTfTdFuA6+NsWvw2VdQR3K+DjbcI2xtOFIGYuBXWECro\nwNwozY8k4MeDuM3YVKZEPKQEXkIP/N4bJ5hgzxINVQ0tGlLJKJBeA+9NGnJlqlvT\nnGD1JW/fI6KwnExV8VFb0HlXlwKBgQDi+0dfjNSXGnqEhJKIeOKMllAhGYQ3qvck\nQxXtIvHaAUoTJIk0o3BfBF6Qglw8vY9PEVYcvo9OVbee+UQZl/B6QRsXT4YMFsCV\nfONogfRGJl4QjphH+/uutSK0s/gYaj0ffNKt0eE4ZXwvCeEXo/FWpjcCUnbEug4M\nI3qaysmiGwKBgGXFRgiWX4HX4Sl8dVtfG+pIwGdf+V5KTxMOjqhWRfJqEujkCbTD\nTbDJfYOZqLdpKi7ANnFaNBFXGh1MRylTrqxFVBYNDYhesnDTIvXdqK4fgRwTvnRr\nuOxIYNSCihjRo7z64/bU0BrSDzKRh4aliXf6WBf5sbZo5+yU1OM28+TDAoGAUZyf\n0Q9F8P6oRrWUKlWsv3fcX8pY69sg+XzViWojI4uLIs7kNnT9lmxvw+3bVEukF33Y\nRIWP6U6QsyxU/A7RfGOkZgFF5VrY6+b3rT/soLxy3eknf9puaCbgz7BV6BFq4MN0\nzOLF5A05VYBr2qArykgBR2h3I8zx+BNZpgZ78TkCgYEAikeIkUmQ8GHKH9b1xgTb\nzz9IvjycbV0xWTaadGIVgTzfk0S8o3wVuPj+YmA60ue9CKr11MdwsouWYCGWk/U/\ntRPOHTlhDvzoODrD+3ZdEJ0ydrsAQ/Bk58uDAGNBoM61hp+61CLv8bjmSou4CGp7\nfX1+ecuICwSD7cCGmXxEoZE=\n-----END PRIVATE KEY-----\n',
  client_email:
    process.env.FIREBASE_CLIENT_EMAIL ||
    'firebase-adminsdk-wjd70@rsvp-dd222.iam.gserviceaccount.com',
  client_id: process.env.FIREBASE_CLIENT_EMAIL || '112398468462981195118',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    process.env.FIREBASE_CERT_URL ||
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wjd70%40rsvp-dd222.iam.gserviceaccount.com',
};

export const STORAGE_BUCKET =
  process.env.FIREBASE_STORAGE_BUCKET || 'gs://rsvp-dd222.appspot.com';
