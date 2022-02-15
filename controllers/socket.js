
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    const update = { onine : true}

    await usuario.updateOne(update);
    return usuario;

}

const usuarioDesconectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    const update = { onine : false}

    await usuario.updateOne(update);
    return usuario;

}

const grabarMensaje = async(payload) =>{
    try{
        const mensaje = new Mensaje(payload); 
        await mensaje.save();
        return true;
    } catch (error){
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}