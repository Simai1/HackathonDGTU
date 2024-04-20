import express from 'express';
import cookieParser from 'cookie-parser';
import corsMiddleware from './middlewares/cors.js';
import dbUtils from './utils/db.js';
// import session from 'express-session';
// import cronService from './services/cron.js';
import 'dotenv/config';
import authRoute from './routes/auth.js';
import parserRouter from './routes/parser.js';
import shopRouter from "./routes/shop.js";
import productRouter from './routes/product.js';
import testUtils from './utils/test-data.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Init DB section //
(async function initDb() {
    try {
        await dbUtils.initializeDbModels();
        // if (process.env.NODE_ENV === 'development') {
        await testUtils.fillWarehouse();
        // }
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

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {},
// }))

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(corsMiddleware);

app.use('/auth', authRoute);
app.use('/parser', parserRouter);
app.use('/product', productRouter);
app.use('/shop', shopRouter);

app.listen(PORT, () => console.log(`Listen on :${PORT}`));
