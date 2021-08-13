# Instrucciones para configurar el servidor de backend

## Pre-requisitos
- NodeJS (Versión 14.15.5 o superior preferiblemente)
- PostgreSQL versión 13
- Cliente de Base de Datos para poder realizar los scripts iniciales (PGAdmin, Datagrid sirven)

## Puesta en marcha 

1. Comprobar que después de haber descargado el repositorio y estar dentro de la carpeta *Plants-Tutorial-Backend-Node-Express*, se encuentren las siguientes carpetas y archivos creados:  
![image](https://user-images.githubusercontent.com/63127022/129306391-21f42822-4752-44ac-acb8-719d19312c4e.png)

2. Dentro de la carpeta *database* se encontraran los archivos para la creación del esquema, tablas, vistas, store procedures, y triggers en la base de datos:  
![image](https://user-images.githubusercontent.com/63127022/129306746-ba5f4a02-7c06-4949-b7bf-afc2f702f5d9.png)  
Cree una base de datos en PostgreSQL con el nombre que desee y después corra los scripts que se encuentran dentro de estos archivos. Después de este paso, la base de datos debería estar lista para poder ser usada por el backend. El orden para ejecutar los scripts que se encuentran en los archivos es el siguiente:
    - *creates.sql*
    - *functions.sql*
    - *triggers.sql*
    - *inserts.sql*  

3. En la carpeta verá también un archivo llamado *.sample.env*. En este podrá encontrar el nombre de las variables de entorno que usa el servidor para funcionar. Creen un archivo llamado *.env* al mismo nivel en el árbol de directorios que el *.sample.env* y asigne los valores de cada una de las variables que se encuentren ahí. El contenido de cada variable de entorno es el siguiente:  
```
PORT=<Número del puerto donde desea que el servidor de backend esté a la escucha>
PG_DB_USER="<Nombre de usuario para acceder a la base de datos en PosgreSQL>"
PG_DB_HOST="<Dirección del host donde esté escuchando PostgreSQL>" Nota: Si su servidor esta corriendo localmente, pueden indicar como host la dirección 127.0.0.1 o escribir literalmente localhost
PG_DB_NAME="<Nombre de la base de datos donde se corrieron los scripts del paso 2>"
PG_DB_PASSWORD="<Clave del usuario de postgres que indicaron anteriormente>"
PG_DB_PORT=<Número de puerto donde esté escuchando PostgreSQL>
PG_DB_SCHEMA="<Nombre del esquema que se creo cuando se corrieron los scripts del paso 2>"
```  
Ejemplo:
```
PORT=3000
PG_DB_USER="postgres"
PG_DB_HOST="192.168.0.54"
PG_DB_NAME="db_test"
PG_DB_PASSWORD="qwerty123456"
PG_DB_PORT=5432
PG_DB_SCHEMA="plt_tut"
``` 

4. Abra una consola o terminal y ubiquese en está carpeta (*Plants-Tutorial-Backend-Node-Express*). Después de esto ejecute el siguiente comando para desargar las dependencias necesarias para correr el servidor (Nota: Este paso puede tardarse dependiendo de la conexión a internet)  
```
$ npm install
```  

5. Después de que haya finalizado la descarga de las dependencias, ejecute los siguientes comandos para correr el servidor:
```
$ npm run build
$ npm run start
```  
El primer comando transpilará el código de JavaScript moderno (ECMAScript 6 o superior) y lo transformará en código JavaScript "clásico" para poderlo ejecutar normalmente. Después de esto verá como se genera una carpeta llamada *dist*  
![image](https://user-images.githubusercontent.com/63127022/129309662-7a63cdb4-8469-47a5-b178-c8c4a71be74a.png)  
El segundo comando tomará el código que se creo en la carpeta *dist* con el comando anterior y lo ejecutará. Cuando ejecute el comando debería poder ver lo siguiente por consola:  
![image](https://user-images.githubusercontent.com/63127022/129310010-c5226265-e8a7-449d-b592-95f26b550930.png) 
Ya en este punto, el servidor está totalmente configurado y listo para recibir peticiones API REST.  
Cabe acotar también que para evitar tener que ejecutar los 2 comandos anteriores, puede usar el siguiente comando que transpilará el código y lo ejecutará de una vez:
```
$ npm run build:start
```
Y en caso que quiera desarrollar y no quiera detener la ejecución del servidor para volverlo a iniciar con los cambios realizados puede utilizar el siguiente comando que cada vez que guarde cambios en los archivos .js, reiniciará automaticamente el servidor con los cambios realizados en el código  
```
$ npm run start:dev
```
**Nota**: Este comando, a diferencia de los anteriores, no generá la carpeta *dist* ya que corre directamente con una dependencia de desarrollo llamada *@babel/node* que permite ejecutar código JavaScript "moderno" sin necesidad de transpilarlo. Así que en caso de ejecutar este comando sin ejecutar previamente *npm build* o *npm build:start*, es normal que no se te cree la carpeta *dist*. De la misma forma, si se ejecuta *npm build* o *npm build:start*, y después se ejecuta *npm run start:dev*, el código que esté en la carpeta *dist* no se actualziará con los cambios que se realicen hasta que se realice la transpilación del código
