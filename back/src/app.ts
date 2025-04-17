import express from "express";
import route from "../src/routers/userRouter";
import cors from "cors";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/api",route)


app.listen(port,()=>{
    console.log(`Servidor online em http://127.0.0.1:${port}`)
}
)