var http = require("http")

//create a server object:
http
  .createServer((req, res) => {
    console.log("Handling Request")
    res.write(
      "<h1>Hello World!<h1><h2>I am running from a Node.js HTTP Server</h2>"
    )
    res.end()
  })
  .listen(1251)
