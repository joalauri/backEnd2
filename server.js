/* Importing the json method from the express module. */
const { json } = require("express");
/* Importing the express module. */
const express = require("express");
/* A middleware that logs all the requests that are being made to the server. */
const morgan = require("morgan");
/* Importing the router from the routes.js file. */
const { router } = require("./routes/routes");


const app = express();
app.set("port", process.env.PORT || process.argv[2]);
const port = app.get("port");

/* A middleware that logs all the requests that are being made to the server. */
app.use(morgan("dev"));
/* A middleware that is used to parse the data that is being sent from the client to the server. */
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
/* Telling the server to use the router. */
app.use(router);

/* Listening to the port 8080. */
app.listen(port, () => {
  if (port === process.argv[2])
    console.log(`server running on port: ${port} \nhttp://localhost:${port}`);
});

