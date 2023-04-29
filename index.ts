const path = require('node:path');
const fs = require('node:fs');
const fsPromise = require('node:fs/promises')

const readRecursiveFiles = async (receivePath : String) : Promise<string[]> => {

  if (typeof receivePath !== "string") {
    throw new Error("Path must be a string");
  }

  if (!fs.lstatSync(receivePath).isDirectory()) {
    throw new Error("Path must be a directory");
  }

  let filenames: string[] = [];
  async function helperRecursive(currentPath : string) {
    let isDir : Boolean = fs.lstatSync(currentPath).isDirectory();
    if (isDir) {
      let dirDetails : string[] = await fsPromise.readdir(currentPath);

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

module.exports = readRecursiveFiles;
