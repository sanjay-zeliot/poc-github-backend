let express = require("express");
let cors = require("cors");
let axios = require("axios");
let bodyParser = require("body-parser");

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
