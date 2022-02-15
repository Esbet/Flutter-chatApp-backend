const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', async (client) => {
    console.log('Cliente conectado');

    const[valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //verificador autenticación 

    if(!valido){return client.disconnect();}

    //Cliente autenticado

    usuarioConectado(uid);

    //ingresar al usuario en una sala 
    client.join(uid);

    client.on('mensaje-personal', async ( payload ) =>{
        
        await grabarMensaje(payload);
        io.to( payload.para ).emit('mensaje-personal', payload );
    })


    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

   /* client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });*/


});
