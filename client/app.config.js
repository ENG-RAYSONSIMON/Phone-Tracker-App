import 'dotenv/config';

export default {
  expo: {
    name: 'client',
    slug: 'slug',
    // other expo config...
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      SERVER_URL: process.env.SERVER_URL,
    },
  },
};
