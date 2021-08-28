const util = require("util");
const exec = util.promisify(require("child_process").exec);
async function makePhoto() {
  try {
    await exec("raspistill -o ./photo.jpg -w 640 -h 480m");
    await exec(
      `convert -size 640x480 photo.jpg -size 640x20 -font \"Courier\" -pointsize 12 -background \"#800000\" -fill black -gravity center  caption:\"${new Date().toString()}\" -gravity south -composite photo.jpg`
    );
    console.log("Photo was made: ", new Date().toString());
  } catch (err) {
    console.error(err);
  }
}
module.exports = makePhoto

