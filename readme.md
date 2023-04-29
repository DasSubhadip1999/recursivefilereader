# Recursive File reader in Directory

This package reads all the child files and return an array of file paths from a directory

## Installation

Install recursivefilereader with npm install recursivefilereader

```bash
  npm install recursivefilereader
```

## Example

```
const filereader = require("recursivefilereader");

filereader("./test1")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

```
