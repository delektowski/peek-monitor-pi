module.exports = async function makePhoto() {
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);
  const Raspistill = require("node-raspistill").Raspistill;
  const camera = new Raspistill({
    width: 640,
    height: 480,
    outputDir: "public/",
    fileName: "photo",
  });

  const addBanner = `cd public && convert -size 640x480 photo.jpg -size 640x20 -font \"Courier\" -pointsize 12 -fill black -gravity center  caption:\"${new Date().toString()}\" -gravity south -composite photo.jpg`;

  try {
    await camera.takePhoto()
    console.log("Photo was made on :", new Date().toString());
    await exec(addBanner);
    console.log("Banner was made on :", new Date().toString());
    makePhoto()
  } catch(err) {
    console.log("Error:", err);
    makePhoto()
  }
};
