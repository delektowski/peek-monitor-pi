const util = require("util");
const exec = util.promisify(require("child_process").exec);
async function lsWithGrep() {
  try {
    await exec("raspistill -o /home/pi/image-small.jpg -w 640 -h 480m");

  } catch (err) {
    console.error(err);
  }
}
lsWithGrep();
