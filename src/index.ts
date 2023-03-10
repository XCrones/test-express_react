import express from "express";
import dotenv from "dotenv";
import checkAuth from "./utils/checkAuth";
import authValidation from "./utils/authValidation";
import { CartController, UserController } from "./controllers";
import { UserValidators, ShopValidators } from "./validators";

dotenv.config();

const PORT = process.env.PORT || 5555;
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.json(true));

app.post("/auth/signup", UserValidators.signUp, UserController.signUp);
app.post("/auth/signin", UserValidators.signIn, UserController.signIn);
app.get("/auth/me", checkAuth, authValidation, UserController.getMe);

app.get("/fakeshop/cart", checkAuth, authValidation, CartController.getCart);
app.post("/fakeshop/cart", checkAuth, authValidation, ShopValidators.Cart, CartController.pushCart);
app.patch("/fakeshop/cart", checkAuth, authValidation, ShopValidators.Cart, CartController.updateCart);
app.delete("/fakeshop/cart", checkAuth, authValidation, ShopValidators.DeleteCart, CartController.deleteCart);

app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
