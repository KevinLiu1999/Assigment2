import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const prisma = new PrismaClient();

app.post("/food",async(req,res)=>{
    const{food,calories} = req.body;
    const caloriesInt = parseInt(calories)
    const foodItem = await prisma.foodTracker.create({
        data:{
            food,
            calories: caloriesInt,
        },
    });
    res.json(foodItem);
})

app.get("/food",async(req,res)=>{
    const foodItems = await prisma.foodTracker.findMany();
    res.json(foodItems);
})

app.get("/food/:id",async(req,res)=>{
    const id = parseInt(req.params.id);
    const foodItem = await prisma.foodTracker.findUnique({
      where:{
        id:id
      },
    });
    res.json(foodItem);
  })

  app.put("/food/:id",async(req,res)=>{
    const id = parseInt(req.params.id);
    const{food,calories} = req.body;
    const caloriesInt = parseInt(calories);
    const updateFood = await prisma.foodTracker.update({
      where:{
        id:id
      },
      data:{
        food,
        calories:caloriesInt,
      },
    });
    res.json(updateFood);
  })

  app.delete("/food/:id",async(req,res)=>{
    const id = parseInt(req.params.id);
    const deleteFood= await prisma.foodTracker.delete({
      where: {
        id,
      },
    });
    res.json(deleteFood);
  })



// app.listen(8000, () => {
//     console.log("Server running on http://localhost:8000 🎉 🚀");
//   });
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:8000/${PORT}`)
});