//munippmqDybWVfiE
//advanceNodeApp

import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

const url = 'mongodb+srv://advanceNodeApp:munippmqDybWVfiE@cluster0.yqmtelq.mongodb.net/advance-node-app?retryWrites=true&w=majority&appName=Cluster0'
let server: Server;
const PORT = 8000;
async function main() {
  try {
    await mongoose.connect(url)
    console.log("Connecting to mongodb using mongoose !!")
    server: app.listen(PORT, () => {
      console.log(`App is the listening on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
