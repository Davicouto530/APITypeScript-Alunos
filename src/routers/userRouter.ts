import { Router } from "express";
import { getUsers, create, update, deleta } from "../controllers/userControllers";
const route = Router();
route.get("/alunos", getUsers);
route.post("/create", create);
route.put("/update/:id", update)
route.delete("/delete/:id", deleta)
export default route;
