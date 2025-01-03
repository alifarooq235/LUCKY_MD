const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib096bVhvUWE1cHo3bkN2L3hyRlIzd2w1OVFZY2lDajg2NkdDODF1WFNGdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHRZVUhNWlJzQkY5ayt0U1lNQ3IwUEMvWHkrOHRoMU5mWWtlTlZFNHppZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRDMrZ1p6ZnJublZ5ekV4ck1WVitEeklPVlFqemVsLzJxMFdIT25ZS1d3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVeUlpRXBnUzRDeEZyYmFGS3l1ZStkSktUbnJvYjdYTktucVlLVEozMGcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndLSUE2cXR0OG91V3dsVXBTdEo3YVFmSitWQmJnakRwd0hTaVNRTkZobEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5ISDZwZmc5S3RyMThaTVVadjUxci9UTnlKSDB6UEJjTjNkSk5OYXRzMFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0lpSDJQcFFtUEp4TTBWUkYvRXR3SURwRzBZQnJqbEN5RkRzWjdTL1EwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEpxRDFZbURuRmhLbUIvK1FIUFMvYzFIUWhZdkFiMWIwbUxaWERJV0xpMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZYS1o3KzZDblRVNXVMVHZEK2RHTmI2bitrb2lhbHNCc0szUmcvdGNjdjkyNzBUL2haWTF5b3dCS3NNYlBUMVVDclV4OC9BV1I0Wll4aHVqRTlNQkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE1LCJhZHZTZWNyZXRLZXkiOiJidFU4QWh0eXR2dFgxQ1dJazFRTmlIRklnaVBKNkIxeEtmL08xbXJ5cHAwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzLWVkR1A0eVJVT19TeVNYNzBqVG13IiwicGhvbmVJZCI6Ijg0OTBkYmQ2LTE0YWEtNDcwNS05ZDgxLTA0MmU3MTNiNzU2ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaQkxmNGdsVVRlVzByZGExZ1BaS3lCS3B3alE9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imt5dWZzZi8vb2J1blhwSEY2WlNwS2FrNzc4dz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05PZHk3OEZFS0hOcWJzR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InVPY0s5d0luTVJhRTNaSnVoeHROZFV5Vk81ancvNWZrZ2phWEw2c0xXbUU9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im5KSDVuSUl1TzE5RG5tS3JSNTNxNWtpRFpYd082ZzY4bExEZjlsZEg4bUx1dFkzcU9mUFo3UmJheW9ocFJpUUR6RWFXYjA4NjdFZWh0ck55NkFVOEF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJEd3Q2QU9VbWJLNm43MjhUcmpmM3JOS21YeU43Ry93T3dvdGJwRDQwZmNUK08zT0VRYjdQcmE0eXQwN2lyeFk2Qkpna0F5all5SHQyZE9VNnV1L3dCUT09In0sIm1lIjp7ImlkIjoiOTIzMjE2MTIyMDg3OjE4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjY4Nzc1Mjc4NTIyNTQzOjE4QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMyMTYxMjIwODc6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYmpuQ3ZjQ0p6RVdoTjJTYm9jYlRYVk1sVHVZOFArWDVJSTJseStyQzFwaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1MDI2MzUxLCJsYXN0UHJvcEhhc2giOiJpRWFaMSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 923006586907",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'yes', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
