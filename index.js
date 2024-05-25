const dotenv = require("dotenv")
dotenv.config()

const express = require('express')
const app = express()
app.use(express.json())

const helmet = require('helmet');
app.use(helmet());

const apicache = require('apicache');
const cache = apicache.middleware;

// Custom cache condition to only cache GET requests and exclude the /catalog route
const onlyGetRequests = (req, res) => {
  return req.method === 'GET'
};
app.use(cache('5 minutes', onlyGetRequests));

//This I m not sure, preventing cost I guess
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 150, // 100 requests per 5 minutes
});

app.use(limiter);
app.disable('x-powered-by')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require('cors');
const corsOptions = {
  methods: 'GET,PUT,POST,DELETE',
};
app.use(cors(corsOptions));

const usersRoute = require("./routes/users")
const propertiesRoute = require("./routes/properties")
const rentalsRoute = require("./routes/rentals")
const purchaseRoute = require("./routes/purchase")
const catalogRoute = require("./routes/catalog")
const filterRoute = require("./routes/filter")
const imageRoute = require("./routes/images")
const authRoute = require("./routes/auth")


app.use("/properties", propertiesRoute)
app.use("/users", usersRoute)
app.use("/rentals", rentalsRoute)
app.use("/catalog", catalogRoute)
app.use("/filter", filterRoute)
app.use("/images", imageRoute)
app.use("/auth", authRoute)
app.use("/purchase", purchaseRoute)

env = process.env.NODE_ENV || 'development';
app.use((err, req, res, next) => {
  if (env === 'production') {
    res.status(500).send('Server Error');
  } else {
    // In development, you may want to send the full error message for debugging purposes
    res.status(500).send(err.message);
  }
});

module.exports = { app };