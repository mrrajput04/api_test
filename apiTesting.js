const http = require("http");
const insert = require("./index");

const hostname = "127.0.0.1";

const port = 3000;

const dataReq = async (data) => {
  let b = Buffer.from(data, "utf-8").toString();
  b = JSON.parse(b);
  console.log(b);
  const x = await insert("users", b.firstName, b.email, b.lastName, b.password)
    .then(() => {
      console.log("data send successfully");
    })
    .then(() => "DATA SAVE");
  console.log(x, "--->");
  
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
