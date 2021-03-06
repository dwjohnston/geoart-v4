const express = require("express");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Twitter = require("twitter");
var serviceAccount = require("./geoart-v4-firebase-adminsdk-ih5ne-2f150a239b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://geoart-v4.firebaseio.com"
});

//admin.initializeApp();

var twitterClient = new Twitter({
  consumer_key: functions.config().twitter.consumer.key,
  consumer_secret: functions.config().twitter.consumer.secret,
  access_token_key: functions.config().twitter.access.key,
  access_token_secret: functions.config().twitter.access.secret
});

var defaultStorage = admin.storage();
var bucket = defaultStorage.bucket(functions.config().gcp.bucket);

const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const imageDataURI = require("image-data-uri");

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;

const progress = require("progress-stream");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.json({
    limit: 500000
  })
); // for parsing application/json

let indexGet = (request, response, id) => {
  console.log(id);
  const filePath = path.resolve(__dirname, "./", "index.html");
  // // read in the index.html file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    let file = bucket.file(id + ".png");
    file.getMetadata((err, metadata, apiResponse) => {
      let result = data.replace(
        /\$OG_IMAGE/g,
        "https://storage.googleapis.com/geoart-v4.appspot.com/" + id + ".png"
      );
      result = result.replace(/\$OG_URL/g, "https://geoplanets.io/" + id);

      if (metadata) {
        console.log("metadata");
        console.log(metadata.metadata);
        result = result.replace(
          /\$OG_WIDTH/g,
          metadata.metadata.width || DEFAULT_WIDTH
        );
        result = result.replace(
          /\$OG_HEIGHT/g,
          metadata.metadata.height || DEFAULT_HEIGHT
        );
      }
      // response.set('Cache-Control', 'public, no-cache');

      console.log("sending");
      response.send(result);
    });
  });
};

class Defferred {
  constructor() {
    const that = this;
    this.prom = new Promise((resolve, reject) => {
      that.resolve = resolve;
      that.reject = reject;
    });
  }
}
``;
exports.onNewImage = functions.storage.object().onFinalize(object => {
  const file = bucket.file(object.name);
  return file
    .makePublic()
    .then(res => {
      console.log(res);

      return bucket.file(object.name).download((err, file, response) => {
        if (err) {
          throw err;
        } else {
          return twitterClient.post(
            "media/upload",
            {
              media: file
            },
            (err, media, response) => {
              if (!err) {
                let status = {
                  status:
                    "Somebody created this at https://geoplanets.io #geometry #geometricart",
                  media_ids: media.media_id_string
                };

                return twitterClient.post(
                  "statuses/update",
                  status,
                  (error, tweet, response) => {
                    if (!error) {
                      console.log(tweet);
                      return prom.resolve(response);
                    } else {
                      return prom.reject(error);
                    }
                  }
                );
              } else {
                throw err;
              }
            }
          );

          // fetch("https://platform.hootsuite.com/v1/messages", {
          //   method: "POST",
          //   body: {
          //     text: "test",
          //     socialProfileIds: ["geoplanets.io"],
          //     scheduledSendTime: moment().format() + "Z",
          //     media: file

          //   }
          // }

          // ).then((res) => {
          //   console.log("sucess");
          // }).catch(err => {
          //   console.log(err)
          // });
        }
      });
    })
    .catch(err => {
      throw err;
    });
});

app.get("/:id", (request, response) => {
  console.log("foo");
  indexGet(request, response, request.params["id"]);
});

app.get("/", (request, response) => {
  indexGet(request, response, "S1oh1J7k7");
});

app.use(express.static(path.resolve(__dirname, "../build")));

exports.app = functions.https.onRequest(app);
