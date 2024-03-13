import express, { Application, json } from "express";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", middlewares.uniqueName, logics.create);

app.get("/products", logics.read);

app.use("/products/:id", middlewares.idExists);

app.get("/products/:id", logics.retrieve);
app.patch("/products/:id", middlewares.uniqueName, logics.partialUpdate);
app.delete("/products/:id", logics.destroy);

const PORT: number = 3000;
app.listen(PORT, (): void => {
  console.log(`Application is running on port: ${PORT}`);
});
