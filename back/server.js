const app=require("./app")

//Setear el archivo de configuración
const dotenv=require("dotenv");
dotenv.config({path: 'back/config/config.env'})

const server=app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})