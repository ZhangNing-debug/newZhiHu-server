/**
 * Node服务相关
 * @author: XiaoNing
 * @since:  2020/05/04
 * @update: 2020/05/04
 */
// import errorHandler from "errorhandler";
import app from './app';
/**
 * Error Handler. Provides full stack - remove for production
 */
// app.use(errorHandler());
/**
 * Start Express server.
 */
const PORT = process.env.PORT || 8090;

const server = app.listen(PORT, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        PORT,
        // process.env
    );
    console.log("  Press CTRL-C to stop\n");
});

export = server;
