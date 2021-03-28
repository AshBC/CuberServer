const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const fs = require("fs");
const { POINT_CONVERSION_HYBRID } = require("constants");

function loadVideoData() {
  return fs.readFileSync("./data/videos.json", "utf8");
}

router.get("/", (req, res) => {
  console.log(req);
  const VList = JSON.parse(loadVideoData());
  const videosMapped = VList.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.json(videosMapped);
});

router.get("/:id", (req, res) => {
  const VList = JSON.parse(loadVideoData());
  const foundVideoIndex = VList.findIndex((video) => {
    return video.id === req.params.id;
  });
  res.json(VList[foundVideoIndex]);
});

router.post("/", (req, res) => {
  if (req.body.name === "" && req.body.description === "") {
    res.status(422).send("please enter a name and description");
  } else {
    const VList = JSON.parse(loadVideoData());
    const newVideo = {
      id: uuidv4(),
      title: req.body.name,
      channel: req.body.channel,
      description: req.body.description,
      timestamp: req.body.timestamp,
      video: req.body.video,
      image: "https://cubes-server.herokuapp.com/imgs/floatingCube.jpg",
      comments: [],
    };
    VList.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(VList));

    res.json({
      message: "posted to videos endpoint",
      videoPosted: newVideo,
    });
  }
});

module.exports = router;
