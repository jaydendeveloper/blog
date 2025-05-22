import express, { json } from "express";
import { db } from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(json());

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
})


app.get("/blogs",async (req,res)=>{

    const blogs = db.prepare("SELECT * FROM blogs").get();

    res.send(blogs);
});