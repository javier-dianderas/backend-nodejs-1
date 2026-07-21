# API E-commerce

Backend desarrollado con **Node.js**, **Express** y **MongoDB** para la gestión de productos y carritos de compra. El proyecto implementa una arquitectura por capas, permitiendo intercambiar el mecanismo de persistencia entre **MongoDB** y **FileSystem** mediante el patrón **DAO + Repository**.

## Características

- CRUD completo de productos.
- CRUD completo de carritos.
- Paginación de productos.
- Filtros y ordenamiento por precio.
- Validación de datos mediante Zod.
- Manejo centralizado de errores.
- Arquitectura desacoplada utilizando DAO, Repository y DTO.
- Persistencia intercambiable (MongoDB o FileSystem).
- Vistas web desarrolladas con Handlebars.
- Actualización en tiempo real mediante Socket.IO.

---

# Tecnologías utilizadas

- Node.js 24.14.0
- Express
- MongoDB Atlas
- Mongoose
- Handlebars
- Socket.IO
- Zod
- dotenv

---

# Arquitectura

El proyecto implementa una arquitectura por capas para separar responsabilidades y facilitar el mantenimiento.

```
Cliente
    │
Routes
    │
Controllers
    │
Services
    │
Repositories
    │
DAO
 ┌───────────────┐
 │               │
MongoDB     FileSystem
```

Cada capa tiene una única responsabilidad:

- **Routes:** definición de endpoints.
- **Controllers:** reciben las peticiones HTTP.
- **Services:** implementan la lógica de negocio.
- **Repositories:** desacoplan la lógica del mecanismo de persistencia.
- **DAO:** acceso a datos.
- **DTO:** desacoplan la estructura de persistencia del resto del sistema.

---

# Estructura del proyecto

```
src
│
├── config
├── controllers
├── dao
│   ├── mongo
│   └── filesystem
├── dto
├── errors
├── middlewares
├── models
├── repositories
├── routes
├── schemas
├── services
├── utils
├── public
├── views
└── app.js
```

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/javier-dianderas/backend-nodejs-1.git
```

Ingresar al proyecto

```bash
cd api-ecommerce
```

Instalar dependencias

```bash
npm install
```

---

# Variables de entorno

Crear un archivo **.env**

```env
# Puerto del servidor
PORT=8080

# MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/lava_ecommerce

# Configuración de paginación
PAGINATION_LIMIT=10
PAGINATION_PAGE=1

# Persistencia
PERSISTENCE=MONGO

# Datos iniciales
SEED_DATA=true
```

## Persistencia

El proyecto permite cambiar la implementación del acceso a datos sin modificar la lógica de negocio.

### MongoDB

```env
PERSISTENCE=MONGO
```

### FileSystem

```env
PERSISTENCE=FILESYSTEM
```

---

# Ejecutar el proyecto

```bash
npm run dev
```

El servidor quedará disponible en

```
http://localhost:8080
```

---

# Endpoints principales

## Productos

| Método | Endpoint           | Descripción         |
| ------ | ------------------ | ------------------- |
| GET    | /api/products      | Obtener productos   |
| GET    | /api/products/:pid | Obtener un producto |
| POST   | /api/products      | Crear producto      |
| PUT    | /api/products/:pid | Actualizar producto |
| DELETE | /api/products/:pid | Eliminar producto   |

---

## Carritos

| Método | Endpoint                      | Descripción          |
| ------ | ----------------------------- | -------------------- |
| GET    | /api/carts/:cid               | Obtener carrito      |
| POST   | /api/carts                    | Crear carrito        |
| PUT    | /api/carts/:cid               | Reemplazar productos |
| DELETE | /api/carts/:cid               | Eliminar carrito     |
| POST   | /api/carts/:cid/products/:pid | Agregar producto     |
| PUT    | /api/carts/:cid/products/:pid | Modificar cantidad   |
| DELETE | /api/carts/:cid/products/:pid | Eliminar producto    |

---

# Vistas

| Ruta           | Descripción                          |
| -------------- | ------------------------------------ |
| /products      | Catálogo de productos con paginación |
| /products/:pid | Detalle del producto                 |
| /carts/:cid    | Visualización del carrito            |

---

# WebSockets

Se implementó Socket.IO para actualizar automáticamente el catálogo de productos.

Cuando un producto es:

- creado
- actualizado
- eliminado

Todos los clientes conectados reciben una notificación y la vista se actualiza sin necesidad de recargar la página.

---

# Validaciones

Se utiliza **Zod** para validar:

- req.body
- req.params
- req.query

Todas las solicitudes son validadas antes de llegar a la lógica de negocio.

---

# Manejo de errores

La aplicación implementa:

- Middleware centralizado de errores.
- Clase `AppError`.
- Respuestas HTTP consistentes.
- Validación de ObjectId.
- Manejo de errores de Mongoose.

---

# Base de datos

Se utilizan dos colecciones principales.

## Products

- title
- description
- code
- price
- stock
- category
- thumbnails

## Carts

- items
- product
- quantity

---

# Autor

Javier Dianderas
