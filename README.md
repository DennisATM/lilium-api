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
DB_USER=postgres
DB_PASS=1234
DB_HOST=localhost
DB_NAME=ecommerce
DB_PORT=5432
PORT=4000
```
4. Levantar el servidor
```bash
npm run dev
```
El servidor se ejecutará en:
👉 http://localhost:4000

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
POST	    /api/v1/users/register	Registra un nuevo usuario
POST        /api/v1/users/login     Inicio de sesión de usuario
POST        /api/v1/users/guest     Registra un nuevo usuario invitado
GET	        /api/v1/users	        Lista todos los usuarios
DELETE	    /api/v1/users/:id	    Elimina usuario por ID
```
🔹 Carrito de compras (por implementar 🚧)
```
Método	    Ruta	                Descripción
GET	        /api/cart/:userId	    Ver carrito de un usuario
POST	    /api/cart	            Agregar producto al carrito
DELETE	    /api/cart/:itemId	    Quitar producto del carrito
```
🔹 Órdenes (por implementar 🚧)
```
Método	    Ruta	            Descripción
GET	        /api/orders	        Lista todas las órdenes
POST	    /api/orders	        Crea una nueva orden
GET	        /api/orders/:id	    Ver detalle de una orden
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