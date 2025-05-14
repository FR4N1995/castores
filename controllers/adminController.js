import { check, validationResult } from "express-validator"
import Productos from '../models/Productos.js'
import {formatearFecha} from '../helpers/fecha.js'
import Historico from "../models/Historico.js"

const home = async(req, res) =>{
  const { pagina: paginaActual } = req.query;

  const exprecionRegular = /^[1-9]$/;

  if (!exprecionRegular.test(paginaActual)) {
    return res.redirect("/administrador/home?pagina=1");
  }
  // Limite y Offset para el paginador
  const limit = 5;
  const offset = paginaActual * limit - limit;

    const [productos, total] = await Promise.all([
        Productos.findAll(
            {
                 limit: limit,     // <- Aplicar aquí
                offset: offset,
            }
        ),
        Productos.count()
    ])

    return res.render('administrador/home',{
        pagina: 'Inventario',
        usuario: req.usuario,
        productos,
        total,
        limit,
        offset,
        paginas: Math.ceil(total / limit),
        paginaActual: Number(paginaActual),
        formatearFecha
    })
}


const formCrearProducto = async(req, res) =>{
      /* verificar que quien vidita sea administrador */
  if (req.usuario.admin !== 1) {
    res.redirect("/");
  }
    return res.render('administrador/agregarProducto',{
        pagina: "Agregar Producto",
        usuario: req.usuario,
        datos: {}
    })
}

const guardarProducto = async(req, res) =>{
          /* verificar que quien vidita sea administrador */
  if (req.usuario.admin !== 1) {
    res.redirect("/");
  }

    await check("nombre").notEmpty().withMessage('El nombre es obligatorio').run(req);

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        return res.render('administrador/agregarProducto',{
        pagina: "Agregar Producto",
        usuario: usuario,
        datos: req.body,
        errores: resultado.array()
        })
    }
    const {nombre} = req.body;
    const nombreminusculas = nombre.toLowerCase();

    const producto = await Productos.findOne({where: {nombre}});
    if(producto){
        return res.render('administrador/agregarProducto',{
        pagina: "Agregar Producto",
        usuario: usuario,
        datos: req.body,
        errores: [{msg: "El producto ya existe"}]
        })
    }

    try {
        await Productos.create({
           nombre: nombreminusculas
        })
        return res.redirect('/administrador/home')
    } catch (error) {
        console.log(error)
    }

}

const cambiarEstado = async(req, res) =>{
    // console.log(req.params.id)
    const {id} = req.params;

    const producto = await Productos.findOne({where: {id}});

    producto.estado= !producto.estado;

    await producto.save();

    res.json({
        resultado: "Estado Actualizado"
    })
}

const formEntradaproducto = async(req, res) =>{
      const usuario = {
        admin : 1
    }

    return res.render('administrador/agregarEntrada', {
        pagina: 'Realizar entrada de Producto',
        datos: {},
        usuario: usuario
    });
}

const guardarProductoEntrada = async(req, res) =>{
       const usuario = {
        admin : 1
    }
    await check("cantidad").notEmpty().withMessage('La cantidad es obligatoria').isFloat({ min: 1 }).withMessage('Debe ser un número positivo mayor a 0')
        .run(req);
    await check("cantidad").isString().withMessage('Solo acepta numeros').run(req);

    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        return res.render('administrador/agregarEntrada', {
        pagina: 'Realizar entrada de Producto',
        datos: req.body,
        usuario: usuario,
        errores: resultado.array()

        }); 
    }
    
    const {id} = req.params;
    const {cantidad} = req.body;

    const producto = await Productos.findOne({where: {id}});

    if (!producto || !producto.estado) {
        return res.render('administrador/agregarEntrada', {
        pagina: 'Realizar entrada de Producto',
        datos: req.body,
        usuario: usuario,
        errores: [{msg: "Producto no valido o inactivo"}]

        });  
    }

    // Convertir a número y sumar
    const cantidadActual = Number(producto.cantidad) || 0;
    producto.cantidad = cantidadActual + Number(cantidad);

    await producto.save();

    // Registrar el movimiento en historico
    await Historico.create({
        tipo: 'entrada',
        productoId: producto.id,
        usuarioId: req.usuario.admin
    })

    // redireccionar a home
    res.redirect('/administrador/home');
}
const formSalidaproducto = async(req, res) =>{
      const usuario = {
        admin : 1
    }

    return res.render('administrador/agregarSalida', {
        pagina: 'Realizar salida de Producto',
        datos: {},
        usuario: usuario
    });
}
const guardarProductoSalida = async (req, res) => {
    const usuario = { admin: 1 };
    
    // Validaciones CORREGIDAS (usa isNumeric en lugar de isString)
    await check("cantidad")
        .notEmpty().withMessage('La cantidad es obligatoria')
        .isFloat({ min: 1 }).withMessage('Debe ser un número positivo mayor a 0')
        .run(req);

    let resultado = validationResult(req);

    if(!resultado.isEmpty()) {
        return res.render('administrador/agregarEntrada', {
            pagina: 'Realizar salida de Producto',
            datos: req.body,
            usuario: usuario,
            errores: resultado.array()
        }); 
    }
    
    const { id } = req.params;
    const { cantidad } = req.body;

    const producto = await Productos.findOne({ where: { id } });

    if (!producto || !producto.estado) {
        return res.render('administrador/agregarEntrada', {
            pagina: 'Realizar salida de Producto',
            datos: req.body,
            usuario: usuario,
            errores: [{ msg: "Producto no válido o inactivo" }]
        });  
    }

    // Convertir a número (asegurarse que son números)
    const cantidadNumerica = Number(cantidad);
    const cantidadActual = Number(producto.cantidad) || 0;

    // Validar que haya suficiente inventario CORREGIDO
    if (cantidadActual < cantidadNumerica) {
        return res.render('administrador/agregarEntrada', {
            pagina: 'Realizar salida de Producto',
            datos: req.body,
            usuario: usuario,
            errores: [{ msg: "No hay suficiente inventario" }]
        }); 
    }

    // RESTAR (aquí estaba el error principal)
    producto.cantidad = cantidadActual - cantidadNumerica;

    await producto.save();

    // Registrar el movimiento
    await Historico.create({
        tipo: 'salida',
        cantidad: cantidadNumerica, // Asegúrate de guardar la cantidad en el histórico
        productoId: producto.id,
        usuarioId: req.usuario.id
    });

    res.redirect('/administrador/home');
}


export { 
    home,
    formCrearProducto,
    guardarProducto,
    cambiarEstado,
    formEntradaproducto,
    guardarProductoEntrada,
    formSalidaproducto,
    guardarProductoSalida
}