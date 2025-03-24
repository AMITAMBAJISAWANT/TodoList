const express =require("express");
const mysql =require("mysql2");
const cors=require("cors");

require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Amit1#",
  database:"todo_db",
});

db.connect((err)=>{
    if(err){
        console.log("Database connection failed",err);
    } else{
        console.log("Connnceted to my sql database");
    }
});

app.get("/todos",(req,res)=>{
    db.query("SELECT * FROM todos",(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json(todos);
    });
});

app.post("/todos",(req,res)=>{
    const{title}=req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    db.query("INSERT INTO todos (title) VALUES(?)",[title],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json({id:result.insertId,title,completed:false});
});
});

app.put("/todos/:id",(req,res)=>{
    const{ id } =req.params;
    const {completed} = req.body;
    db.query("UPDATE todos SET completed = ? WHERE ID =?",[completd,id],(err)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json({message:"To do upadted successfully"});
    });

});

app.delete("/todos/:id",(req,res)=>{
    const{ id } = req.params;
    db.query("DELETE FROM todos WHERE id=?",[id],(err)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json({message:"Todo deleted successfully"});
    });
    
});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});
