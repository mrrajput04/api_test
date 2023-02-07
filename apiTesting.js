const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";

const port = 3000;

const dataReq = (data) => {
  const b = new Buffer.from(data, "utf-8").toString();
  fs.writeFile("employee.json", b, async () => {
    try {
      await fs.promises.writeFile("employees.json", b, "utf8");
      console.log("data entered successfully");
    } catch (err) {
      console.error("Error occurred while reading directory!", err);
    }
  });
};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  console.log(req.method, "-->");

  if (req.method === "GET") {
    req.on("data", dataReq);
    res.end("get method");
    return;
  }
  if (req.method === "POST") {
    req.on("data", dataReq);
    res.end("post method ");
    return;
  }
  if (req.method === "PUT") {
    res.end("put method ");

    return;
  }
  if (req.method === "DELETE") {
    res.end("delete method ");
    return;
  } else {
    res.statusCode = 400;
    console.log("error");
    res.end("400 not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
