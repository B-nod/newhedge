// Force disable WASM for undici before anything else
process.env.UNDICI_NO_WASM = "1";
process.env.NODE_OPTIONS = "--no-experimental-fetch";




const http= require("http");
const next= require("next");
const url= require("url");

const port = parseInt(process.env.PORT || "3001", 10);
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || (dev ? "localhost" : "0.0.0.0");

// Initialize Next.js app
const app = next({
  dev,
  hostname,
  port,
  dir: __dirname, // Explicitly set directory
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        handle(req, res, parsedUrl);
      })
      .listen(port, hostname, (err) => {
        if (err) throw err;
        console.log(
          `> Server listening at http://${hostname}:${port} as ${
            dev ? "development" : process.env.NODE_ENV
          }`,
        );
      });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
