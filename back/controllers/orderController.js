const Order=require("../models/order");
const Product= require("../models/productos")
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

//Crear una nueva orden
exports.newOrder= catchAsyncErrors (async (req, res, next)=>{
    const {
        items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo
    } = req.body;

    const order= await Order.create({
        items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo,
        fechaPago: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
})

//Ver una orden
exports.getOneOrder= catchAsyncErrors(async(req, res, next)=>{
    const order= await Order.findById(req.params.id).populate("user", "nombre email") //restriccion de usuario

    if(!order){
        return next(new ErrorHandler("No encontramos una orden con ese Id",404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

//Ver todas mis ordenes (usuario logueado)
exports.myOrders= catchAsyncErrors(async(req,res, next)=>{
    const orders= await Order.find({user: req.user._id});

    res.status(200).json({
        success:true,
        orders
    })
})

//Admin
//Ver todas la ordenes (Administrador)
exports.allOrders= catchAsyncErrors(async (req, res, next)=>{
    const orders= await Order.find()

    let cantidadTotal= 0;
    orders.forEach(order =>{
        cantidadTotal= cantidadTotal + order.precioTotal
       // cantidadTotal += order.precioTotal
    })

    res.status(200).json({
        success:true,
        cantidadTotal,
        orders
    })

})

//Editar una orden (admin) 
exports.updateOrder= catchAsyncErrors(async(req, res, next)=>{
    const order= await Order.findById(req.params.id)

    if(!order){
        return next (new ErrorHandler("Orden no encontrada", 404))
    }

    if (order.estado==="Enviado"){
        return next(new ErrorHandler("Esta orden ya fue enviada", 400))
    }

    order.estado= req.body.estado;
    order.fechaEnvio= Date.now();

    await order.save()

    res.status(200).json({
        success:true,
        order
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.inventario= product.inventario-quantity;
    await product.save({validateBeforeSave: false})
}

//Eliminar una orden (admin)
exports.deleteOrder = catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next (new ErrorHandler("Esa orden no esta registrada", 404))
    }
    await order.remove()

    res.status(200).json({
        success:true,
        message:"Orden eliminada correctamente"
    })
})