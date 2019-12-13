import * as express from "express";
import { connect } from "mongoose";
import {
  allProducts,
  addProduct,
  deleteProduct,
  getProduct,
} from "./controllers/productController";

const app = express();
const port = 8899;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world 2!");
});
app.get("/products", allProducts);
app.post("/products/add", addProduct);
app.delete("/products/delete", deleteProduct);
app.get("/products/:id", getProduct);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

const uri: string =
  "mongodb+srv://cabezonidas:TestPassword1407@repocluster-exdit.mongodb.net/test?retryWrites=true&w=majority";

connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully Connected!");
    }
  }
);
