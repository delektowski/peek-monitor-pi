const util = require("util");
const exec = util.promisify(require("child_process").exec);
async function lsWithGrep() {
  try {
    await exec("raspistill -o ./image.jpg -w 640 -h 480m");
    await exec(`convert -size 640x480 image.jpg -size 640x20 -font \"Courier\" -pointsize 12 -background \"#800000\" -fill black -gravity center  caption:${new Date().toUTCString()} -gravity south -composite image.jpg`);


  } catch (err) {
    console.error(err);
  }
}
lsWithGrep();
