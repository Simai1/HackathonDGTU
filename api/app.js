import express from 'express';
import cookieParser from 'cookie-parser';
import corsMiddleware from './middlewares/cors.js';
import dbUtils from './utils/db.js';
// import cronService from './services/cron.js';

import authRoute from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Init DB section //
(async function initDb() {
    try {
        await dbUtils.initializeDbModels();
    } catch (e) {
        console.log(e);
        console.log('COULD NOT CONNECT TO THE DB, retrying in 5 seconds');
        setTimeout(initDb, 5000);
    }

})();
// ============== //

// CronJob section //
// cronService.agreementDecline.start();
// ============== //

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(corsMiddleware);

app.use('/auth', authRoute);

app.listen(PORT, () => console.log(`Listen on :${PORT}`));
