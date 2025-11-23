# 📖 Clase 6: Preparando el Entorno

## 🎯 Objetivos de la Clase

- Comprender qué es Docker y cuál es su funcionalidad en el desarrollo backend
- Aprender a instalar Docker en diferentes sistemas operativos (Windows, Linux, macOS)
- Dominar los comandos básicos de Docker para gestionar contenedores
- Crear y configurar un archivo docker-compose.yml para MySQL y phpMyAdmin
- Configurar un entorno de desarrollo completo con bases de datos usando Docker

---

## 📚 ¿Qué es Docker?

### 🔍 Definición

**Docker** es una plataforma de contenedores de código abierto que permite empaquetar aplicaciones y sus dependencias en contenedores ligeros y portátiles. Docker utiliza la virtualización a nivel de sistema operativo para ejecutar múltiples contenedores de forma aislada en un mismo host, compartiendo el kernel del sistema operativo.

### 🏗️ Características Principales

- **Contenedores Ligeros:** Los contenedores comparten el kernel del sistema operativo, lo que los hace más eficientes que las máquinas virtuales tradicionales
- **Portabilidad:** Una aplicación empaquetada en Docker funciona igual en cualquier sistema operativo que soporte Docker
- **Aislamiento:** Cada contenedor corre de forma aislada, con sus propias dependencias y configuración
- **Escalabilidad:** Fácil de escalar horizontalmente creando múltiples instancias de contenedores
- **Reproducibilidad:** Garantiza que el entorno de desarrollo sea idéntico en todas las máquinas

### 📖 Historia Breve

- **2013:** Docker es lanzado como proyecto de código abierto por Solomon Hykes
- **2014:** Docker 1.0 es lanzado y se convierte en una herramienta estable
- **2015:** Docker Compose es introducido para gestionar aplicaciones multi-contenedor
- **2017:** Docker alcanza más de 13 mil millones de descargas de imágenes
- **2025:** Docker es el estándar de facto para contenedores y es ampliamente usado en desarrollo y producción

---

## 🏛️ Funcionalidad de Docker

### 📝 ¿Para qué sirve Docker?

Docker resuelve el problema clásico de "funciona en mi máquina" al empaquetar aplicaciones con todas sus dependencias en contenedores. Sus principales funcionalidades son:

**1. Aislamiento de Entornos:**

- Cada aplicación corre en su propio contenedor aislado
- No hay conflictos entre dependencias de diferentes proyectos
- Fácil de limpiar eliminando contenedores

**2. Portabilidad:**

- Una aplicación Dockerizada funciona igual en Windows, Linux, macOS
- No necesitas instalar dependencias directamente en tu sistema
- Fácil de compartir con otros desarrolladores

**3. Gestión de Bases de Datos:**

- Levantar bases de datos sin instalarlas directamente
- Múltiples versiones de la misma base de datos para diferentes proyectos
- Fácil de iniciar, detener y eliminar

**4. Desarrollo Consistente:**

- Todos los miembros del equipo tienen el mismo entorno
- El entorno de desarrollo es idéntico al de producción
- Reduce problemas de configuración

**5. Microservicios:**

- Cada servicio corre en su propio contenedor
- Fácil de escalar servicios individuales
- Comunicación entre servicios mediante redes Docker

### 📝 Conceptos Fundamentales de Docker

**Imagen (Image):**
Una imagen es una plantilla de solo lectura que contiene las instrucciones para crear un contenedor. Las imágenes se construyen a partir de un Dockerfile.

```bash
# Ver imágenes disponibles localmente
docker images

# Descargar una imagen
docker pull mysql:8.0
```

**Contenedor (Container):**
Un contenedor es una instancia ejecutable de una imagen. Puedes crear, iniciar, detener, mover o eliminar contenedores.

```bash
# Crear y ejecutar un contenedor
docker run -d --name mi_mysql mysql:8.0

# Ver contenedores en ejecución
docker ps
```

**Dockerfile:**
Un archivo de texto que contiene instrucciones para construir una imagen Docker.

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
```

**Docker Compose:**
Una herramienta para definir y ejecutar aplicaciones Docker multi-contenedor usando un archivo YAML.

```yaml
services:
  web:
    image: nginx
    ports:
      - '80:80'
```

**Volumen (Volume):**
Almacenamiento persistente que permite que los datos sobrevivan incluso cuando se elimina el contenedor.

```bash
# Crear un volumen
docker volume create mi_volumen

# Usar un volumen en un contenedor
docker run -v mi_volumen:/var/lib/mysql mysql
```

**Red (Network):**
Permite que los contenedores se comuniquen entre sí de forma aislada.

```bash
# Crear una red
docker network create mi_red

# Conectar un contenedor a una red
docker run --network mi_red mysql
```

---

## 🏗️ Instalación de Docker

### 📄 Instalación en Windows

**Requisitos previos:**

- Windows 10 64-bit: Pro, Enterprise o Education (Build 19041 o superior)
- Windows 11 64-bit: Home o Pro versión 21H2 o superior
- Habilitar la característica WSL 2 (Windows Subsystem for Linux 2)
- Virtualización habilitada en BIOS

**Pasos de instalación:**

1. **Habilitar WSL 2:**

```powershell
# Abrir PowerShell como Administrador y ejecutar:
wsl --install

# Reiniciar el equipo cuando se solicite
```

2. **Descargar Docker Desktop:**

   - Visita: https://www.docker.com/products/docker-desktop
   - Descarga Docker Desktop para Windows
   - Ejecuta el instalador `Docker Desktop Installer.exe`

3. **Instalación:**

   - Acepta los términos de licencia
   - Marca la opción "Use WSL 2 instead of Hyper-V" (recomendado)
   - Completa la instalación y reinicia cuando se solicite

4. **Iniciar Docker Desktop:**

   - Busca "Docker Desktop" en el menú de inicio
   - Inicia la aplicación
   - Espera a que Docker se inicie completamente (verás el ícono de Docker en la bandeja del sistema)

5. **Verificar la instalación:**

```powershell
# Abrir CMD y ejecutar:
docker --version
docker compose version

# Ejecutar un contenedor de prueba
docker run hello-world
```

**Solución de problemas comunes en Windows:**

- Si WSL 2 no está instalado, ejecuta: `wsl --install` en PowerShell como administrador
- Si la virtualización no está habilitada, habilítala en la BIOS/UEFI
- Asegúrate de tener las actualizaciones de Windows más recientes

---

### 📄 Instalación en Linux (Ubuntu/Debian)

**Requisitos previos:**

- Sistema operativo Ubuntu/Debian
- Acceso de administrador (sudo)
- Conexión a internet

**Pasos de instalación:**

```bash
# 1. Actualizar el sistema
sudo apt update

# 2. Instalar dependencias necesarias
sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release

# 3. Agregar la clave GPG oficial de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 4. Agregar el repositorio de Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. Actualizar la lista de paquetes
sudo apt update

# 6. Instalar Docker Engine, CLI, Containerd y Docker Compose
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 7. Verificar la instalación
docker --version
docker compose version

# 8. (Opcional) Agregar tu usuario al grupo docker para ejecutar sin sudo
sudo usermod -aG docker $USER
# Nota: Necesitarás cerrar sesión y volver a iniciar sesión para que esto tenga efecto
```

**Verificar que Docker funciona:**

```bash
# Ejecutar un contenedor de prueba
sudo docker run hello-world

# Si todo está bien, verás un mensaje de bienvenida
```

### 📄 Instalación en macOS

**Opción 1: Usando Homebrew (Recomendado)**

```bash
# 1. Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Instalar Docker Desktop usando Homebrew
brew install --cask docker

# 3. Abrir Docker Desktop desde Aplicaciones
# 4. Verificar la instalación
docker --version
docker compose version
```

**Opción 2: Descarga directa**

1. Visita: https://www.docker.com/products/docker-desktop
2. Descarga Docker Desktop para Mac
3. Abre el archivo `.dmg` descargado
4. Arrastra Docker a la carpeta de Aplicaciones
5. Abre Docker Desktop desde Aplicaciones
6. Sigue las instrucciones del asistente de instalación

**Requisitos para macOS:**

- macOS 10.15 o superior
- Al menos 4 GB de RAM
- VirtualBox anterior a la versión 4.3.30 no debe estar instalado

**Verificar que Docker funciona:**

```bash
# Ejecutar un contenedor de prueba
docker run hello-world
```

## 🚀 Comandos Básicos de Docker

### 📝 Gestión de Contenedores

```bash
# Ver contenedores en ejecución
docker ps

# Ver todos los contenedores (incluyendo detenidos)
docker ps -a

# Crear y ejecutar un contenedor en segundo plano
docker run -d --name nombre_contenedor imagen:tag

# Iniciar un contenedor existente
docker start nombre_contenedor

# Detener un contenedor
docker stop nombre_contenedor

# Reiniciar un contenedor
docker restart nombre_contenedor

# Eliminar un contenedor (debe estar detenido)
docker rm nombre_contenedor

# Eliminar un contenedor en ejecución (forzado)
docker rm -f nombre_contenedor

# Ver logs de un contenedor
docker logs nombre_contenedor

# Ver logs en tiempo real
docker logs -f nombre_contenedor

# Ejecutar comandos dentro de un contenedor en ejecución
docker exec -it nombre_contenedor bash
```

### 📝 Gestión de Imágenes

```bash
# Ver imágenes disponibles localmente
docker images

# Descargar una imagen
docker pull nombre_imagen:tag

# Eliminar una imagen
docker rmi nombre_imagen:tag

# Eliminar imágenes no utilizadas
docker image prune

# Buscar imágenes en Docker Hub
docker search nombre_imagen
```

### 📝 Gestión de Volúmenes

```bash
# Crear un volumen
docker volume create nombre_volumen

# Ver volúmenes
docker volume ls

# Inspeccionar un volumen
docker volume inspect nombre_volumen

# Eliminar un volumen
docker volume rm nombre_volumen

# Eliminar volúmenes no utilizados
docker volume prune
```

### 📝 Gestión de Redes

```bash
# Crear una red
docker network create nombre_red

# Ver redes
docker network ls

# Inspeccionar una red
docker network inspect nombre_red

# Eliminar una red
docker network rm nombre_red

# Eliminar redes no utilizadas
docker network prune
```

---

## 🏗️ Docker Compose para MySQL y phpMyAdmin

### 📄 ¿Qué es Docker Compose?

**Docker Compose** es una herramienta para definir y ejecutar aplicaciones Docker multi-contenedor usando un archivo YAML. Permite definir todos los servicios, volúmenes y redes necesarios en un solo archivo, facilitando la gestión de aplicaciones complejas.

**Ventajas de Docker Compose:**

- **Configuración centralizada:** Todo en un solo archivo
- **Gestión simplificada:** Un comando para iniciar/detener todos los servicios
- **Dependencias automáticas:** Los servicios se inician en el orden correcto
- **Redes y volúmenes compartidos:** Configuración automática

### 📝 Crear el archivo docker-compose.yml

Crea un archivo `docker-compose.yml` en la raíz de tu proyecto:

```yaml
services:
  # Servicio de MySQL
  mysql:
    image: mysql:8.0
    container_name: curso_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: curso_backend
      MYSQL_USER: curso_user
      MYSQL_PASSWORD: curso123
    ports:
      - '3306:3306'
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - curso_network
    healthcheck:
      test:
        [
          'CMD',
          'mysqladmin',
          'ping',
          '-h',
          'localhost',
          '-u',
          'root',
          '-proot123',
        ]
      interval: 10s
      timeout: 5s
      retries: 5

  # Servicio de phpMyAdmin (interfaz web para administrar bases de datos MySQL)
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: curso_phpmyadmin
    restart: always
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
      PMA_USER: root
      PMA_PASSWORD: root123
      MYSQL_ROOT_PASSWORD: root123
    ports:
      - '8080:80'
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - curso_network

volumes:
  mysql_data:
    driver: local

networks:
  curso_network:
    driver: bridge
```

### 🔍 Explicación del archivo docker-compose.yml

**Estructura general:**

- `services:`: Define los contenedores que se ejecutarán
- `volumes:`: Define el almacenamiento persistente
- `networks:`: Define las redes para comunicación entre contenedores

**Nota:** En las versiones modernas de Docker Compose, la línea `version` ya no es necesaria y está obsoleta. Docker Compose detecta automáticamente la versión del archivo.

**Servicio MySQL:**

- `image: mysql:8.0`: Usa la imagen oficial de MySQL versión 8.0
- `container_name: curso_mysql`: Nombre personalizado del contenedor
- `restart: always`: Reinicia automáticamente si el contenedor se detiene
- `environment:`: Variables de entorno para configurar MySQL
  - `MYSQL_ROOT_PASSWORD`: Contraseña del usuario root
  - `MYSQL_DATABASE`: Nombre de la base de datos que se creará automáticamente
  - `MYSQL_USER`: Usuario adicional que se creará
  - `MYSQL_PASSWORD`: Contraseña del usuario adicional
- `ports: "3306:3306"`: Mapea el puerto 3306 del contenedor al puerto 3306 del host
- `volumes: mysql_data:/var/lib/mysql`: Monta un volumen para persistir los datos
- `networks: curso_network`: Conecta el contenedor a la red personalizada
- `healthcheck`: Verifica que MySQL esté listo antes de que otros servicios dependan de él

**Servicio phpMyAdmin:**

- `image: phpmyadmin/phpmyadmin`: Imagen oficial de phpMyAdmin
- `container_name: curso_phpmyadmin`: Nombre personalizado del contenedor
- `restart: always`: Reinicia automáticamente si el contenedor se detiene
- `environment:`: Variables de entorno para configurar phpMyAdmin
  - `PMA_HOST`: Host de MySQL (nombre del servicio en Docker)
  - `PMA_PORT`: Puerto de MySQL
  - `PMA_USER`: Usuario para conectarse a MySQL
  - `PMA_PASSWORD`: Contraseña para conectarse a MySQL
  - `MYSQL_ROOT_PASSWORD`: Contraseña root de MySQL (necesaria para phpMyAdmin)
- `ports: "8080:80"`: Mapea el puerto 80 del contenedor al puerto 8080 del host
- `depends_on: mysql`: Asegura que MySQL se inicie antes que phpMyAdmin
- `volumes`: phpMyAdmin no requiere volúmenes adicionales para funcionamiento básico
- `networks: curso_network`: Conecta el contenedor a la misma red que MySQL

**Volúmenes:**

- `mysql_data`: Volumen persistente para almacenar los datos de MySQL
- `driver: local`: Almacena los datos en el sistema de archivos local

**Redes:**

- `curso_network`: Red personalizada que permite que los contenedores se comuniquen entre sí
- `driver: bridge`: Tipo de red que permite comunicación entre contenedores en el mismo host

### 🚀 Uso del docker-compose.yml

**Comandos principales:**

```bash
# Iniciar los servicios en segundo plano
docker compose up -d

# Iniciar los servicios y ver los logs
docker compose up

# Ver el estado de los servicios
docker compose ps

# Ver los logs de todos los servicios
docker compose logs

# Ver los logs de un servicio específico
docker compose logs mysql

# Ver los logs en tiempo real
docker compose logs -f

# Detener los servicios (mantiene los contenedores)
docker compose stop

# Detener y eliminar los contenedores (mantiene los volúmenes)
docker compose down

# Detener y eliminar los contenedores y volúmenes (¡CUIDADO! Esto elimina los datos)
docker compose down -v

# Reconstruir los servicios después de cambios
docker compose up -d --build

# Ver el estado de los servicios
docker compose ps
```

### 🌐 Acceso a los Servicios

**MySQL:**

- **Host:** localhost (o 127.0.0.1)
- **Puerto:** 3306
- **Usuario root:** root
- **Contraseña root:** root123
- **Usuario adicional:** curso_user
- **Contraseña usuario:** curso123
- **Base de datos:** curso_backend

**Conexión desde terminal:**

```bash
# Conectarse a MySQL usando Docker
docker exec -it curso_mysql mysql -u root -proot123 curso_backend

# O usando mysql directamente (si está instalado)
mysql -h localhost -P 3306 -u root -proot123 curso_backend
```

**phpMyAdmin:**

- **URL:** http://localhost:8080
- **Usuario:** root (o curso_user)
- **Contraseña:** root123 (o curso123)

**Configurar conexión a MySQL en phpMyAdmin:**

1. Abre tu navegador y ve a http://localhost:8080
2. Inicia sesión en phpMyAdmin con:
   - **Usuario:** root
   - **Contraseña:** root123
3. phpMyAdmin se conectará automáticamente a MySQL usando la configuración del docker-compose.yml
4. Verás la base de datos `curso_backend` en el panel izquierdo

**Nota:** phpMyAdmin es una herramienta web popular y fácil de usar para administrar bases de datos MySQL, ofreciendo una interfaz gráfica intuitiva para gestionar tablas, ejecutar consultas SQL y realizar tareas administrativas.

---

## 🚀 Ejercicio Práctico

### 📝 Configurar el Entorno Completo

**Objetivo:** Instalar Docker y configurar un entorno de desarrollo con MySQL y phpMyAdmin.

**Pasos a seguir:**

1. **Instalar Docker** según tu sistema operativo (Windows, Linux o macOS) usando las instrucciones anteriores

2. **Verificar la instalación:**

```bash
docker --version
docker compose version
docker run hello-world
```

3. **Crear el archivo docker-compose.yml** en la raíz de tu proyecto con el contenido mostrado anteriormente

4. **Iniciar los servicios:**

```bash
docker compose up -d
```

5. **Verificar que los servicios están corriendo:**

```bash
docker compose ps
```

6. **Conectarse a MySQL:**

```bash
docker exec -it curso_mysql mysql -u root -proot123 curso_backend
```

7. **Crear una tabla de prueba:**

```sql
CREATE TABLE prueba (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

INSERT INTO prueba (nombre) VALUES ('Test exitoso');
SELECT * FROM prueba;
```

8. **Acceder a phpMyAdmin:**

   - Abre tu navegador
   - Ve a http://localhost:8080
   - Inicia sesión con:
     - Usuario: root
     - Contraseña: root123
   - Explora la interfaz y verifica que puedes ver la base de datos `curso_backend` y la tabla `prueba` que creaste

9. **Ver los logs de los servicios:**

```bash
docker compose logs
```

10. **Detener los servicios:**

```bash
docker compose down
```

**Archivo `docker-compose.yml` completo:**

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: curso_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: curso_backend
      MYSQL_USER: curso_user
      MYSQL_PASSWORD: curso123
    ports:
      - '3306:3306'
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - curso_network
    healthcheck:
      test:
        [
          'CMD',
          'mysqladmin',
          'ping',
          '-h',
          'localhost',
          '-u',
          'root',
          '-proot123',
        ]
      interval: 10s
      timeout: 5s
      retries: 5

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: curso_phpmyadmin
    restart: always
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
      PMA_USER: root
      PMA_PASSWORD: root123
      MYSQL_ROOT_PASSWORD: root123
    ports:
      - '8080:80'
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - curso_network

volumes:
  mysql_data:
    driver: local

networks:
  curso_network:
    driver: bridge
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio:

Configura tu entorno de desarrollo y familiarízate con Docker:

1. **Instalar Docker** en tu sistema operativo siguiendo las instrucciones correspondientes

2. **Verificar la instalación:**

   - Ejecutar `docker --version` y `docker compose version`
   - Ejecutar el contenedor de prueba `hello-world`

3. **Crear el archivo docker-compose.yml** con MySQL y phpMyAdmin

4. **Iniciar los servicios** y verificar que funcionan correctamente

5. **Conectarse a MySQL** y crear una base de datos de prueba

6. **Acceder a phpMyAdmin** y explorar la interfaz, verificando la conexión a MySQL

7. **Documentar el proceso:**
   - Capturar pantallas del proceso de instalación
   - Anotar cualquier problema encontrado y su solución
   - Crear un archivo `README.md` con instrucciones personalizadas para tu sistema

**Requisitos técnicos:**

- Docker instalado y funcionando correctamente
- Archivo `docker-compose.yml` configurado y funcionando
- MySQL accesible en el puerto 3306
- phpMyAdmin accesible en http://localhost:8080
- Al menos una base de datos de prueba creada
- Documentación del proceso de instalación

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [Documentación oficial de Docker](https://docs.docker.com/) - Guía completa de referencia para Docker
- [Docker Hub](https://hub.docker.com/) - Repositorio de imágenes Docker oficiales y de la comunidad
- [Docker Compose Documentation](https://docs.docker.com/compose/) - Documentación específica de Docker Compose
- [MySQL Docker Image](https://hub.docker.com/_/mysql) - Documentación de la imagen oficial de MySQL
- [phpMyAdmin Docker Image](https://hub.docker.com/r/phpmyadmin/phpmyadmin) - Documentación de la imagen oficial de phpMyAdmin

### 📖 Conceptos para Investigar

- **Dockerfile:** Aprende a crear tus propias imágenes Docker
- **Docker Swarm:** Orquestación de contenedores para producción
- **Kubernetes:** Sistema de orquestación más avanzado para contenedores
- **Volúmenes nombrados vs anónimos:** Diferentes tipos de persistencia de datos en Docker

---

## ❓ Preguntas Frecuentes

### ¿Cuál es la diferencia entre Docker y una máquina virtual?

- **Máquinas Virtuales (VM):**

  - Incluyen un sistema operativo completo (guest OS)
  - Son más pesadas y consumen más recursos
  - Tardan más en iniciar
  - Mayor aislamiento pero menor eficiencia

- **Contenedores Docker:**
  - Comparten el kernel del sistema operativo host
  - Son más ligeros y eficientes
  - Inician mucho más rápido
  - Menor aislamiento pero mayor eficiencia

**Ejemplo:** Una VM puede ocupar varios GB y tardar minutos en iniciar, mientras que un contenedor Docker puede ocupar MB y iniciar en segundos.

### ¿Por qué usar Docker para bases de datos en desarrollo?

- **Ventajas:**

  - No necesitas instalar MySQL directamente en tu sistema
  - Puedes tener múltiples versiones de MySQL para diferentes proyectos
  - Fácil de limpiar: simplemente eliminas el contenedor
  - Entorno consistente entre diferentes desarrolladores
  - No contamina tu sistema con dependencias

- **Cuándo no usarlo:**
  - Si necesitas máximo rendimiento en producción (aunque Docker puede usarse en producción)
  - Si prefieres gestionar la base de datos directamente en el sistema operativo
  - Si tienes restricciones de recursos muy limitadas

### ¿Qué pasa con mis datos cuando elimino un contenedor?

- **Sin volumen:** Los datos se pierden cuando eliminas el contenedor
- **Con volumen:** Los datos persisten en el volumen, incluso si eliminas el contenedor

**Ejemplo:**

```bash
# Crear un contenedor con volumen
docker run -d -v mysql_data:/var/lib/mysql mysql

# Eliminar el contenedor
docker rm -f nombre_contenedor

# Los datos siguen en el volumen mysql_data
# Puedes crear un nuevo contenedor usando el mismo volumen
```

### ¿Cómo puedo ver qué está consumiendo espacio en Docker?

```bash
# Ver el uso de espacio de Docker
docker system df

# Ver detalles de imágenes, contenedores y volúmenes
docker system df -v

# Limpiar recursos no utilizados
docker system prune

# Limpiar todo (¡CUIDADO! Esto elimina todo lo no utilizado)
docker system prune -a --volumes
```

---

## 🎉 ¡Entorno Preparado!

¡Excelente trabajo! Ya conoces qué es Docker, cómo instalarlo en diferentes sistemas operativos, y cómo configurar un entorno de desarrollo completo con MySQL y phpMyAdmin usando Docker Compose. En la próxima clase profundizaremos en el modelado de datos y aprenderemos a diseñar esquemas de base de datos más complejos.

**Recuerda:** Docker es una herramienta poderosa que simplifica significativamente el desarrollo backend. Practica creando diferentes configuraciones y experimenta con diferentes servicios. ¡Sigue practicando! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre Docker, Docker Compose o la configuración del entorno, no dudes en consultar durante la clase o por los canales de comunicación establecidos._
