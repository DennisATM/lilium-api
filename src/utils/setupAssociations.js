import { setupCartRelations } from "../models/index.js";

export const setupAssociation = async () => {
    try {
       await setupCartRelations();
    } catch (error) {
        console.error('Error al inicializar las relaciones', error);
    }
}