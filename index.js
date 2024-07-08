const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/sse", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendData = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Simulate SSE data
  const intervalId = setInterval(() => {
    const message = `Server Time: ${new Date().toLocaleTimeString()}`;
    sendData({ message });
  }, 1000);

  // Close SSE connection when the client disconnects
  req.on("close", () => {
    clearInterval(intervalId);
  });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
