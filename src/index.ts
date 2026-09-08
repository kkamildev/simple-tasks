
import express from "express"
import {Request, Response} from "express"
import { createLog } from "./utils/files/createLog";
import { serverErrorHandler } from "./utils/handlers";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"



const run = async () => {
    dotenv.config();
    const app = express();
    app.use(express.json());
    app.use(cookieParser(process.env.COOKIE_SECRET || "huuygiiuyyg2jhnbbn"))


    app.get("/", (req : Request, res : Response) => {
        res.json({message:"Got users", users:[
            "Adam", "Karol", "Sebastian"
        ]});
    })

    app.use(serverErrorHandler);


    app.listen(Number(process.env.PORT || "3000"), "0.0.0.0", () => {
        createLog("OK", `Server started, listening on port ${Number(process.env.PORT || "3000")}`)
    });


}


run();