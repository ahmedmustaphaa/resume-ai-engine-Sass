import ImageKit from '@imagekit/nodejs';
import 'dotenv/config';
export const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

