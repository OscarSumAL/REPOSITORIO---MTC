# Sistema de Control de Usuarios

Este es un sistema simple de control de usuarios que utiliza Node.js y MySQL.

## Requisitos Previos

- Node.js instalado
- MySQL instalado y configurado
- Base de datos CONTROL creada con la tabla USUARIO

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

## Configuración

Asegúrate de tener la base de datos MySQL configurada con:
- Host: localhost
- Usuario: root
- Contraseña: (vacío)
- Base de datos: CONTROL

## Uso

Para iniciar el servidor:
```bash
node index.js
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

- GET `/usuarios` - Obtener todos los usuarios
- POST `/usuarios` - Crear un nuevo usuario

## Estructura de la Base de Datos

La tabla USUARIO tiene la siguiente estructura:
- ID_USUARIO (INT, PRIMARY KEY, AUTO_INCREMENT)
- NOMBRES (VARCHAR(50))
- PRIMER_APELLIDO (VARCHAR(50))
- SEGUNDO_APELLIDO (VARCHAR(50))
- DNI (INT(8), UNIQUE)
- FECHA (TIMESTAMP) 