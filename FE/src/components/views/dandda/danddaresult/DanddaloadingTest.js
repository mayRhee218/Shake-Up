/**
 * @description Image Prediction with Tensorflow JS on simple REACT App
 */

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const TeachableMachine = require("@sashido/teachablemachine-node");

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/0BEUR8k_M/",
});

model
  .classify({
    imageUrl: "https://www.techinn.com/f/13777/137777410/apple-ipad-32gb-10.2-tablet.jpg",
  })
  .then((predictions) => {
    console.log("Predictions:", predictions);
  })
  .catch((e) => {
    console.log("ERROR", e);
  });

const TmPose = () => {};

export default TmPose;
