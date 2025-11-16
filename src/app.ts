import express, { Application } from "express";
import { CreateRoom } from "./Routes/create_room";
import path from "node:path";
import { GetRoom } from "./Routes/get_room";
import { GetMyRoom } from "./Routes/get_my_rooms";

const app: Application = express();
const router: express.Router = express.Router();

app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, "..", "public")))

//routes
app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "..", "public", "index.html")) });
router.post("/api/create-room", CreateRoom);
router.get("/api/get-room/:roomId", GetRoom);
router.get("/api/get-my-room", GetMyRoom);

export default app;
