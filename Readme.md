# Sistema de Gestión de Mascotas y Vacunas

Este proyecto es un sistema integral para la gestión de mascotas y sus registros de vacunación. Incluye una API RESTful desarrollada con Node.js (Express) y SQLite para el backend, y un formulario de contacto en Python (Flask) con funcionalidad de envío de correos electrónicos.

## 🚀 Características Principales

### Backend (Node.js con Express y SQLite)

*   **Gestión de Mascotas (CRUD):**
    *   `GET /api/mascotas`: Obtiene todas las mascotas registradas.
    *   `GET /api/mascotas/:id`: Obtiene una mascota específica por su ID.
    *   `POST /api/mascotas`: Crea un nuevo registro de mascota.
    *   `PUT /api/mascotas/:id`: Actualiza la información de una mascota existente.
    *   `DELETE /api/mascotas/:id`: Elimina una mascota y sus vacunas asociadas.
*   **Gestión de Vacunas (CRUD):**
    *   `GET /api/vacunas`: Obtiene todas las vacunas registradas. Puede filtrar por `mascota_id`.
    *   `GET /api/vacunas/:id`: Obtiene una vacuna específica por su ID.
    *   `POST /api/vacunas`: Registra una nueva vacuna para una mascota.
    *   `PUT /api/vacunas/:id`: Actualiza la información de una vacuna existente.
    *   `DELETE /api/vacunas/:id`: Elimina un registro de vacuna.
*   **Base de Datos SQLite:** Almacenamiento ligero y eficiente para los datos de mascotas y vacunas.
*   **Inicialización de Datos de Ejemplo:** La base de datos se inicializa con algunas mascotas y vacunas de ejemplo si está vacía.
*   **Servidor Express:** Maneja las rutas de la API y sirve archivos estáticos para el frontend.

### Formulario de Contacto (Python con Flask)

*   **API de Contacto:**
    *   `POST /submit-form`: Recibe datos de un formulario de contacto (nombre, apellido, email, teléfono, mensaje).
*   **Almacenamiento de Mensajes:** Guarda los mensajes de contacto en una base de datos SQLite (`database.db`).
*   **Envío de Correos Electrónicos:** Utiliza `smtplib` para enviar notificaciones por correo electrónico con los detalles del formulario a una dirección predefinida.
*   **Validación de Campos:** Asegura que todos los campos obligatorios del formulario estén presentes.
*   **Manejo de Errores:** Captura errores de base de datos (ej. correo duplicado) y errores internos del servidor.

### Frontend (Archivos Estáticos)

*   **Archivos Estáticos:** El servidor Node.js sirve archivos HTML, CSS, JavaScript, imágenes y fuentes desde el directorio raíz del proyecto.
*   **Animaciones CSS:** Incluye la librería `animate.css` para efectos visuales en el frontend.


## 🛠️ Tecnologías Utilizadas

### Backend (Node.js)
*   **Node.js**
*   **Express.js:** Framework web para Node.js.
*   **SQLite3:** Base de datos relacional ligera.
*   **CORS:** Middleware para habilitar Cross-Origin Resource Sharing.

### Formulario de Contacto (Python)
*   **Python 3**
*   **Flask:** Microframework web para Python.
*   **Flask-CORS:** Extensión para habilitar CORS en Flask.
*   **SQLite3:** Base de datos para mensajes de contacto.
*   **smtplib:** Módulo para el envío de correos electrónicos.
*   **email.mime.text / email.mime.multipart:** Para construir mensajes de correo electrónico.

### Frontend
*   **HTML5**
*   **CSS3**
*   **JavaScript**
*   **Animate.css:** Librería de animaciones CSS.

## ⚙️ Configuración y Ejecución

Este proyecto consta de dos partes de backend (Node.js y Python) que pueden ejecutarse de forma independiente o conjunta.

### 1. Configuración del Backend (Node.js)

1.  **Asegúrate de tener Node.js instalado.**
2.  **Navega al directorio `MultipleFiles/`:**
    ```bash
    cd MultipleFiles/
    ```
3.  **Instala las dependencias de Node.js (si las hubiera, aunque no se listan en `requirements.txt` para Node.js, Express y sqlite3 son comunes):**
    ```bash
    npm install express sqlite3 cors
    ```
4.  **Ejecuta el script de inicialización de la base de datos de mascotas:**
    ```bash
    node database.js
    ```
    Esto creará `gestion_mascotas.db` e insertará datos de ejemplo.
5.  **Inicia el servidor Node.js:**
    ```bash
    node app.js
    ```
    El backend de la API de mascotas y vacunas estará corriendo en `http://localhost:3000/api`. El frontend se servirá desde `http://localhost:3000`.

### 2. Configuración del Formulario de Contacto (Python)

1.  **Asegúrate de tener Python 3 instalado.**
2.  **Navega al directorio `MultipleFiles/`:**
    ```bash
    cd MultipleFiles/
    ```
3.  **Instala las dependencias de Python:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configura tus credenciales de correo electrónico en `email_handler.py`:**
    *   Reemplaza `xxxxxxxxxxxxxx@gmail.com` con tu correo de envío.
    *   Reemplaza `xxxxxxxxxxxxxxx` con tu contraseña de aplicación de Gmail (o contraseña de correo si no usas 2FA).
    *   Reemplaza `xxxxxxxxxxxx@gmail.com` con el correo de destino.
    
    **Nota de seguridad:** Para Gmail, necesitarás generar una "contraseña de aplicación" si tienes la verificación en dos pasos activada. No uses tu contraseña principal de Gmail directamente en el código.
5.  **Crea la tabla para los mensajes de contacto:**
    ```bash
    python create_table.py
    ```
    Esto creará `database.db` para los mensajes del formulario.
6.  **Inicia el servidor Flask:**
    ```bash
    python app.py
    ```
    El formulario de contacto estará escuchando en `http://0.0.0.0:5000/submit-form`.

### Acceso al Frontend

Una vez que el servidor Node.js (`app.js`) esté corriendo, puedes acceder al frontend abriendo tu navegador y yendo a `http://localhost:3000`.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes sugerencias para mejorar el proyecto, no dudes en abrir un *issue* o enviar un *pull request*.
