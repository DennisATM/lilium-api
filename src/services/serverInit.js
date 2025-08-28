import { dbConnect } from "./dbConnection.js";

export const serverInit = async( app, port ) => {
    try {
        console.log('Estamos verificando conexion a la BD');
        await dbConnect();
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port} 🍢👌`);
        })
    } catch (error) {
        console.error(`Error al inicializar el servidor ${error}`);
    }
}