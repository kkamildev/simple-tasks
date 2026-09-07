
import express from "express"
import {Request, Response} from "express"
import { createLog } from "./utils/files/createLog";
import { serverErrorHandler } from "./utils/handlers";



const run = async () => {
    const app = express();
    app.use(express.json());


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