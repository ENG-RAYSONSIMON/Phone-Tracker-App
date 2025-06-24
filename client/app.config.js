import 'dotenv/config';

export default {
  expo: {
    name: 'Phone Tracker',
    slug: 'slug',
    icon: './icon.png',
    version: '1.0.0',
    orientation: "portrait",
    android: {
      //permissions
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
      ],
      package: 'com.engraysonsimon.phonetracker',
      config: {
        googleMaps: {
          apiKey: "AIzaSyA8NI5zI1G5urxgogrpjMnhuy8V3s3Ibp0",
        },
      },
    },
    extra: {
      API_BASE_URL: "https://phone-tracker-api.onrender.com",
      eas: {
        projectId: '2b8aa567-8c3d-4ac8-ae4b-3b59cb2d06cc',
      },
    },
  },
};