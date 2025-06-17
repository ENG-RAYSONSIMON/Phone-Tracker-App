import 'dotenv/config';

export default {
  expo: {
    name: 'Phone Tracker',
    slug: 'slug',
    android: {
  
      package: 'com.engraysonsimon.phonetracker',
    },
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      eas: {
        projectId: '2b8aa567-8c3d-4ac8-ae4b-3b59cb2d06cc',
      },
    },
  },
};
