import express from "express";
import bodyParser from "body-parser";
import pgClient from "pg";
import cors from "cors";

const PORT = 3000;
const app = express();
const db = new pgClient.Client({
    user: "postgres",
  host: "localhost",
  database: "JsBlog",
  password: "siddhant@100",
  port: 1202,
});


db.connect();

app.use(express.json({ limit: '500mb' })); // For JSON payloads
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(cors());
app.use(express.urlencoded({extended:true}));


app.get("/getBlogs",async (req,res)=>{
   const result = await db.query("select * from blogs");
   res.json(result.rows);
});


app.get("/view/:id",async(req,res)=>{
    const id = req.params.id;
    const result = await db.query("select * from blogs where id=$1",[id]);
    if(res.rows===0){
        res.status(404).send("No such blog found");
    }
    res.json(result.rows);
});


app.delete("/delete/:id",async(req,res)=>{
    try{
    const id = req.params.id;
    const result = await db.query("delete from blogs where id=$1",[id]);
    res.status(200).send("blog deleted successfully");
    }
    catch(err){
        res.status(404).send("error deleting blog");
    }
});

app.put("/edit/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await db.query("update blogs set title=$1 ,image=decode($2, 'base64') ,blog_content=$3",[req.body.title,req.body.image,req.body.blog_content]);
        res.status(200).send("blog updated successfully"); 
    }
    catch(err){
        console.log(err);
        res.status(404).send("error updating blog");
    }
});

app.post("/addBlog",async(req,res)=>{
    console.log(req.body);
    try{    
        const result = await db.query("insert into blogs(title,image,blog_content,date_created) values($1,decode($2, 'base64'),$3,$4);",[req.body.title,req.body.image,req.body.blog_content,req.body.date_created]);
        res.status(200).send("blog added successfully");
    }
    catch(err){
        console.log(err);
        res.status(404).send("error adding blog");
    }
});


app.listen(PORT,()=>{
    console.log("Server running");
});
