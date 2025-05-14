import { check, validationResult } from "express-validator"
import Usuarios from "../models/Usuario.js";
import {generarJWT} from '../helpers/token.js'

const formLogin = (req, res) =>{
    res.render('auth/login',{
        pagina: "iniciar Sesion"
    })

}

const registrarUsuario = async(req, res) =>{
    const {nombre, email, password, admin} = req.body;
    // creamos el usuario

    const usuario =  await Usuarios.create({
        nombre,
        email,
        password,
        admin: admin
    })

    if(usuario){
        res.json({msg: "Usuario creado Correctamente"})
    }
}

const autenticar = async (req, res) =>{
    // validacion
    await check("email").isEmail().withMessage("escribe Correctamente tu E-mail").run(req);
    await check("password").notEmpty().withMessage("el password es obligatorio").run(req);

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        return res.render("auth/login", {
            pagina: "iniciar sesion",
            errores: resultado.array()
        })
    }

    const {email, password} = req.body;
    
    // comprobar si el usuario existe
    const usuario = await Usuarios.findOne({where: {email}})
    if(!usuario){
         return res.render("auth/login", {
            pagina: "iniciar sesion",
            errores: [{msg: 'Error, Corrobora tus datos'}]
        })
    }
    if(!usuario.verificarPassword(password)){
        return res.render("auth/login", {
            pagina: "iniciar Sesion",
            errores: [{msg: "El prassword es incorrecto"}]
        })
    }
    // autenticar al usuario con libreria jsonWebtoken
    const token = generarJWT({
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        admin: usuario.admin
    });
    
    return res.cookie("_token", token,{
         httpOnly: true,
      // secure: true,
      // sameSite: true
    }).redirect('/administrador/home');

}

const cerrarsesion = (req, res) =>{
    return res.clearCookie('_token').status(200).redirect('/');
}

export{
    formLogin,
    registrarUsuario,
    autenticar,
    cerrarsesion
}