const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');

const {
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
  logErrors,
} = require('./middlewares/error.handler');
const { JwtStrategy } = require('./utils/auth');
const routerApi = require('./routes');

const app = express();

const port = process.env.PORT || '3000';
const whitelist = ['http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

//app.use(cors(options));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(JwtStrategy);

routerApi(app);

app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});
