// IMPORTS -
const express = require("express");
const app = express();
const port = 8000;

app.get("/", (_res: any, res: any) => {
  res.json({
    foo: "bar",
  });
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
