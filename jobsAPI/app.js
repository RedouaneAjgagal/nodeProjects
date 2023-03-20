require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');
const authUser = require('./middleware/authentication');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xssCleaner = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xssCleaner());


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
