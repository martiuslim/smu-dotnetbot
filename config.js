require('dotenv').config();

const config = {};
config.firebase = {};

config.appId = process.env.MICROSOFT_APP_ID;
config.appPassword = process.env.MICROSOFT_APP_PASSWORD;
config.firebase.apiKey = process.env.API_KEY;
config.firebase.authDomain = process.env.AUTH_DOMAIN;
config.firebase.databaseURL = process.env.DATABASE_URL;
config.firebase.storageBucket = process.env.STORAGE_BUCKET;

module.exports = config;
