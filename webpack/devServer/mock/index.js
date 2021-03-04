const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const chokidar = require("chokidar");
const bodyParser = require("body-parser");

const genFiles = function(dir) {
  const recursion = function(arr, p) {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      const dirs = fs.readdirSync(p);
      dirs.forEach((item) => {
        recursion(arr, path.join(p, item));
      });
    } else {
      arr.push(p);
    }
  };
  const paths = [];
  recursion(paths, dir);
  return paths.filter((item) => !/DS_Store/.test(item));
};

const registerRoutes = function(app, proxy, dir) {
  let mocks = [];
  let mockLastIndex;
  const TypeRes = {
    cause: null,
    state: true,
    timestamp: 0,
    message: "SUCCESS",
  };
  const mockSet = new Set();
  const files = genFiles(dir);
  const proxys = Object.keys(proxy);
  files.forEach((item) => {
    try {
      const routes = require(item);
      mocks = mocks.concat(routes);
    } catch (e) {
      console.log(chalk.redBright(`can not parsing：${item}`));
      // nothing
    }
  });

  mocks = mocks.filter((item) => {
    const proxyed = proxys.some((it) => item.url.indexOf(it) !== -1);
    return !proxyed;
  });

  mocks.forEach((item) => {
    const { url, method = "get", handler } = item;
    app[method](url, (req, res) => {
      setTimeout(
        () =>
          res.json({
            ...TypeRes,
            body: handler(req, res),
          }),
        Math.round(Math.random() * 1200)
      );
    });
    mockSet.add(url);
    mockLastIndex = app._router.stack.length;
  });
  const mockRoutesLength = mockSet.size;
  return {
    files,
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
};

const resetRegisterRoutes = function(dir) {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(dir)) {
      delete require.cache[require.resolve(i)];
    }
  });
};

const mock = function(app, proxy) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const dir = path.join(process.cwd(), "/mock");
  let { files, mockRoutesLength, mockStartIndex } = registerRoutes(
    app,
    proxy,
    dir
  );
  // watch files, hot reload mock server
  chokidar.watch(dir).on("all", (event, path) => {
    if (event === "change" || event === "add") {
      if (/DS_Store/.test(path)) return;
      if (event === "add" && files.includes(path)) return;
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength);

        // clear routes cache
        resetRegisterRoutes(dir);

        const mockRoutes = registerRoutes(app, proxy, dir);
        files = mockRoutes.files;
        mockStartIndex = mockRoutes.mockStartIndex;
        mockRoutesLength = mockRoutes.mockRoutesLength;

        console.log(
          chalk.magentaBright(
            `\n > Mock Server hot reload success! changed  ${path}`
          )
        );
      } catch (error) {
        console.log(chalk.redBright(error));
      }
    }
  });
};

module.exports = mock;
