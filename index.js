const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
