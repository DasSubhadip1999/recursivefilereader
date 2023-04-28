const path = require("path");
const fs = require("fs");
const fsPromise = require("fs/promises");

const readRecursiveFiles = async (receivePath) => {
  let filenames = [];

  async function helperRecursive(currentPath) {
    let isDir = fs.lstatSync(currentPath).isDirectory();
    if (isDir) {
      let dirDetails = await fsPromise.readdir(currentPath);
      for (let detail of dirDetails) {
        let newPath = path.join(currentPath, detail);
        await helperRecursive(newPath);
      }
    } else {
      filenames.push(currentPath);
      return [...filenames];
    }
  }

  await helperRecursive(receivePath);
  return filenames;
};

readRecursiveFiles("./test")
  .then((res) => console.log("Your all files are here:", res))
  .catch((err) => console.log(err));
