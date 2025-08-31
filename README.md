# 🛍️ Ecommerce API

API REST para un e-commerce desarrollada con **Node.js, Express, Sequelize y PostgreSQL**.  
Este proyecto es parte de la construcción de un sistema de venta en línea, con backend modular y frontend en **React + TailwindCSS**.

---

## 🚀 Instalación

### 1. Clonar repositorio
```bash
git clone https://github.com/dennisATM/lilium-api.git
cd lilium-api
```

2. Instalar dependencias
```bash
npm install
```
3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto:

```env
PORT=3000
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
DB_NAME
DB_DIALECT
JWT_SECRET
JWT_EXPIRES_IN
```
4. Levantar el servidor
```bash
npm run dev
```
El servidor se ejecutará en:
👉 http://localhost:3000

📦 Endpoints disponibles

🔹 Productos

```Body
Método	Ruta	            Descripción	
GET	    /api/v1/products	    Lista todos los productos
GET	    /api/v1/products/:id	Lista todos los productos por id
POST	/api/v1/products	    Crea un nuevo producto	{ "name": "Laptop", "price": 1200.50, "stock": 10 }
PUT     /api/v1/products/:id    Edita los datos de un producto
GET     /api/v1/filter          Filtra los productos {minPrice, maxPrice, name } 
DELETE	/api/v1/products/:id	Elimina producto por ID
```
🔹 Usuarios
```
Método	    Ruta    	                Descripción
POST	    /api/v1/users/register	Registra un nuevo usuario {firstName, lastName, direction, email, password, phone}
POST        /api/v1/users/login     Inicio de sesión de usuario {email, password}
POST        /api/v1/users/guest     Registra un nuevo usuario invitado {firstName, lastName, direction, phone}
GET	        /api/v1/users	        Lista todos los usuarios
GET         /api/v1/users/me        Lista los datos del usuario activo
DELETE	    /api/v1/users/:id	    Elimina usuario por ID
```
🔹 Carrito de compras
```
Método	    Ruta	                    Descripción
GET	        /api/v1/cart	            Ver carrito del usuario/invitado {Header: Bearer <token>}
POST	    /api/v1/cart	            Agregar producto al carrito {idProduct:<id>, quantity:<qt>}
PUT         /api/v1/cart/:id            Actualiza cantidad de un item del carrito del usuario activo {quantity:<qt>}
DELETE      /api/v1/cart/:id            Elimina un item por id del carrito del usuario activo
DELETE      /api/v1/cart                Vacía el carrito de compras del usuario activo
```
🔹 Órdenes (por implementar 🚧)
```
Método	    Ruta	            Descripción
GET	        /api/v1/orders	        Lista todas las órdenes
POST	    /api/v1/orders	        Crea una nueva orden
GET	        /api/v1/orders/:id	    Ver detalle de una orden
```
🧰 Tecnologías utilizadas
Node.js + Express

Sequelize ORM

PostgreSQL

CORS + Dotenv

Nodemon (para desarrollo)

📖 Notas de desarrollo
 Implementar módulo de usuarios con autenticación (JWT).

 Crear lógica de carrito de compras.

 Generar órdenes con relación a productos y usuarios.

 Agregar pruebas unitarias (Jest / Supertest).

 Documentación futura con Swagger (si el proyecto escala).