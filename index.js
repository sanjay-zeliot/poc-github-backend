let express = require("express");
let cors = require("cors");
require("dotenv").config();
let axios = require("axios");
let bodyParser = require("body-parser");

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async function (req, res) {
  const authCode = req.query.code;
  if (!authCode) {
    res
      .status(400)
      .send("Authentication code is not provided in the query parameters");
  }
  try {
    const githubOauthData = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code: authCode,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (githubOauthData.data.error) {
      if (githubOauthData.data.error === "bad_verification_code") {
        res.status(401).send(githubOauthData.data.error_description);
        return;
      } else {
        throw new Error(githubOauthData.data.error_description);
      }
    }

    res.status(200).json(githubOauthData.data);
  } catch (err) {
    console.log("Inside error");
    console.log(err);
    res.status(500).send(err.toString());
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
