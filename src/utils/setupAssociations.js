import { setupCartRelations, setupOrderRelations } from "../models/index.js";

export const setupAssociation = async () => {
    try {
       await setupCartRelations();
       await setupOrderRelations();
    } catch (error) {
        console.error('Error al inicializar las relaciones', error);
    }
}