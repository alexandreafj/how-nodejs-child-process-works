process.on("message", (message) => {
  const { bookName } = message;
  // Imagine this function counts 'castle' in the book
  const count = Math.round(Math.random() * 100);
  process.send({ count });
});
