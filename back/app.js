const express=require("express");
const app = express();
const errorMiddleware= require("./middleware/errors")

app.use(express.json());

//Importar rutas
const productos=require("./routes/products")
const usuarios=require("./routes/auth")

app.use('/api',productos) //Sujeto a decision (ruta del navegador)
app.use('/api',usuarios)

//MiddleWares para manejar errores
app.use(errorMiddleware)

module.exports=app