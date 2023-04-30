const express=require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");

const connection =require("./db/conn");
const Register=require("./models/registers");
const {json}=require("express");
const port=process.env.PORT||3000;
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const parcial_template_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");

app.set("views",template_path);
hbs.registerPartials(parcial_template_path);

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }
    const checking = await Register.findOne({name: req.body.name})
    try{
        if(checking.name===req.body.name && checking.password===req.body.password)
        {
            res.send("user details already exists"); 
        }
        else{
            await Register.insertMany([data])
        }
    }
    catch{
        res.send("wrong inputs")
    }
    res.status(201).render("index", {
        naming: req.body.name
    })

})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",async(req,res)=>{
    try {
        const check = await Register.findOne({name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("index", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }
 
})


const PORT =3000;
 app.listen(PORT,()=>{
    try{
        connection();
        console.log('Listining to the Port '+PORT);
    }catch(e){
        console.log(e);
    }
 });