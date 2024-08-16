const { fork } = require("child_process");
const os = require("os");

// Get the number of CPU cores
const cpuCount = os.cpus().length;

const optimalChildCount = Math.min(cpuCount - 2, cpuCount);

const books = ["book1.txt", "book2.txt", "book3.txt"];
const childs = [];

for (let i = 0; i < optimalChildCount; i++) {
  const child = fork("counter.js");
  console.log(`Forked child ${i}`);
  childs.push(child);
}

childs.forEach((child, index) => {
  child.on("message", (result) => {
    console.log(`${books[index]} has ${result.count} occurrences of 'castle'`);
  });
});

books.forEach((book) => {
  for (let i = 0; i < childs.length; i++) {
    const child = childs[i];
    if (child) {
      child.send({ bookName: book });
      break;
    }
  }
});
