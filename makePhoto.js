module.exports = async function makePhoto() {
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);
  const Raspistill = require("node-raspistill").Raspistill;
  const camera = new Raspistill({
    width: 640,
    height: 480,
    outputDir: "./",
    fileName: "photo",
  });

  await camera
    .takePhoto()
    .then((photo) => photo)
    .then((photo) => {
      exec(
        `convert -size 640x480 photo.jpg -size 640x20 -font \"Courier\" -pointsize 12 -fill black -gravity center  caption:\"${new Date().toString()}\" -gravity south -composite photo.jpg`
      );
      console.log("Photo was made on:", new Date().toString());
    });
};
