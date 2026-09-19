
import "./utils/config/dotenv"

import express from "express"
import { createLog } from "./utils/files/createLog";
import { createRateLimit, notFoundHandler, serverErrorHandler, serveStaticFiles } from "./utils/handlers";
import cookieParser from "cookie-parser"
import { prepareTransporter, sendEmail } from "./utils/third";
import { taskRoutes, userRoutes } from "./routes";
import path from "node:path";
import { corsErrorHandler, createCorsPolicy } from "./utils/auth";
import { createMysqlDatabase } from "./utils/db";
import {sequelize} from "./config/sequelize"
import { genVerificationEmail } from "./third/mailTemplates";



const run = async () => {
    const app = express();
    prepareTransporter();
    await createMysqlDatabase(process.env.DB_NAME || "simple_tasks_db");
    sequelize.sync({alter:true});
    


    app.use(express.json());
    app.use(cookieParser(process.env.COOKIE_SECRET || "huuygiiuyyg2jhnbbn"));

    app.use(serveStaticFiles(path.join("app", "dist")));

    app.use(createRateLimit(50, 60));
    app.use(createCorsPolicy(["http://localhost:5173", "http://localhost:3000"]));


    app.use("/api/users", userRoutes);
    app.use("/api/tasks", taskRoutes);


    app.use(notFoundHandler());

    app.use(corsErrorHandler);
    app.use(serverErrorHandler);


    app.listen(Number(process.env.PORT || "3000"), "0.0.0.0", () => {
        createLog("OK", `Server started, listening on port ${Number(process.env.PORT || "3000")}`)
    });
}


run();