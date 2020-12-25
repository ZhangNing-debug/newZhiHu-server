const fs = require("fs");

module.exports = (app:any) => {
  fs.readdirSync(__dirname).forEach((file: string) => {
    if (file === "index.js") {
      return;
    }
    console.log(file);
    
    // const route = require(`./${file}`);
    // app.use(route.routes()).use(route.allowedMethods());
    // console.log("route",route);
    // app.use('api', require(`./${file}`));
    require(`./${file}`)(app)
  });
};