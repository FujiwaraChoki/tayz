const withRuntimeDotenv = require('next-runtime-dotenv');

module.exports = withRuntimeDotenv({
    publicRuntimeConfig: {
        YOUTUBE_API_KEY: process.env.API_KEY,
    },
});