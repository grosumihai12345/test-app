// app.js

require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const redisAdapter = require("socket.io-redis");
const { Sequelize } = require("sequelize");
const initExpress = require("./init/express");
const initPg = require("./db/initPg");
const phantomInit = require("./init/phantomInit");
const initConfig = require("./init/config").init;
const routes = require("./routes");

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "dev";
const REDIS_URL = process.env.REDIS_URL;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  username: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "master",
  database: process.env.DATABASE_NAME || "postgres",
});

app.use(cors());

io.adapter(redisAdapter(REDIS_URL));

async function init() {
  try {
    const config = initConfig();
    global.NODE_ENV = NODE_ENV;
    global.config = config;

    const [db, ph] = await Promise.all([
      initPg(config),
      phantomInit.createPhantomSession(app),
    ]);

    app.locals.config = config;
    app.locals.db = db;
    app.locals.ph = ph;
    app.io = io;

    initExpress(app, config);
    routes(app, sequelize);

    io.of("/").adapter.on("error", (err) =>
      console.error("ERROR no redis server", err)
    );

    server.listen(PORT, config.ip, () => {
      console.info("Listening on port: %d, env: %s", PORT, NODE_ENV);
      process.on("exit", () => {
        console.info("exiting phantom session");
        app.locals.ph.exit();
      });
    });
  } catch (error) {
    console.error("Init sequence error: ", error);
  }
}

init();
