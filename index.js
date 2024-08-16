// main.js
const { fork } = require("child_process");

const books = ["book1.txt", "book2.txt", "book3.txt"];
const childs = [];

books.forEach((book) => {
  const child = fork("counter.js");
  child.send({ bookName: book });
  childs.push(child);
});

childs.forEach((child, index) => {
  child.on("message", (result) => {
    console.log(`${books[index]} has ${result.count} occurrences of 'castle'`);
  });
});
