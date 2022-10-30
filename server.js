const express = require("express");
const morgan = require("morgan");
const { router } = require("./routes/routes");

//initializations
const app = express();

//setting

app.set("port", process.env.PORT || 8080);
const port = app.get("port");
//Middlewares
app.use(morgan("dev"));

//Routes
app.use(router);

app.listen(port, () => {
  if (port === 8080) console.log(`server running on port: ${port} http://localhost:${port}` );
});
