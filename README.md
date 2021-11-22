# ampliffy.desarrollo1
Desarrollo 1 prueba tecnica para ampliffy

## Descripción del problema: 

El objeto de este desarrollo es saber qué repositorios se han visto afectados por un commit/cambio en cualquiera de los repositorios que incluye. 
Está enfocado a un sistema de CI/CD (no es necesario que hayas trabajado con CI/CD) que, básicamente, necesita entender dependencias declaradas usando package.json entre códigos ubicados en repositorios distintos. 
Para ello, plantea la solución como un comando de consola que es llamado cuando hay un commit en cualquier repositorio y que recibe por parámetros una ruta a un git, un commit Id y la branch donde se ha hecho el commit.

Crea una o varias clases que, dado una lista de directorios locales donde en cada directorio hay un repositorio git con un fichero package.json, debe crear en memoria una representación en forma de árbol de las dependencias entre repositorios. Ten presente que al haber varios repositorios pueden generarse árboles distintos, es decir, no todos los repositorios forman parte de un mismo árbol.

Sólo debes fijarte en los repositorios incluidos en la lista de directorios, es decir, si un repositorio hace referencia a otros repositorios que no están listados, entonces puedes ignorar los repositorios no listados (en el ejemplo dado más abajo se tratan como repositorio desarrollado por terceras partes).
Incorpora métodos/funciones para preguntar al sistema, dado un nombre de un package.json ( https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name ),
qué otros package.json lo incluyen, tanto de forma directa como indirecta.

Entrégame una URL de github donde pueda ver el resultado del desarrollo, y el historial de commits.

Te pongo un ejemplo con tres niveles de anidación, pero no hay límites en el nivel de anidación:
- Proyecto 1, depende de varios repositorios:
    - Librería 1 (desarrollada in-house)
    - Librería 2 (desarrollada in-house), que a su ves depende de otra librería:
       - Librería 4 (desarrollada in-house)
       - Librería 5 (desarrollada por terceras partes)
    - Librería 3 (desarrollada por terceras partes)

- Proyecto 2, depende de varios repositorios:
    - Librería 2 (desarrollada in-house), que a su ves depende de otra librería:
       - Librería 4 (desarrollada in-house)
       - Librería 5 (desarrollada por terceras partes)
    - Librería 6 (desarrollada por terceras partes)

Con el desarrollo 1, has de detectar que, si se hace un commit en la Librería 4, se ha de lanzar el Pipeline CI/CD asociado al Proyecto 1 y el Pipeline CI/CD asociado al Proyecto 2. En cambio, si se hace un commit en la Librería 1, entonces sólo debe lanzar el Pipeline CI/CD asociado al Proyecto 1.

Para desambiguar qué Proyecto/Librería es desarrollada in-house o por terceras partes, en el desarrollo te indico que todos los Proyectos/Librerías tendrán un git clone  bajo un directorio común, ejemplo:
   - repositories/Proyecto1
   - repositories/Proyecto2
   - repositories/Libreria1
   - repositories/Libreria2
   - repositories/Libreria4

(En esta estructura de ejemplo no he incluido las librerías 3 5 y 6 por no interesarnos que influyan en el lanzamiento de Pipelines CI/CD, por ejemplo, por ser desarrolladas por terceras partes)

## Solución propuesta. 
*  El programa recibe 4 parametros.
   - *"p"* o *"project"* Indica nombre del repositorio al que se le hizo el commit, en caso de no incluirlo el sistema lo pregunta. 
   - *"c"* o *"commit"* Indica el commit ID 
   - *"b"* o *"branch"* Indica el nombre del branch donde se realizó el commit
   - *"d"* o *"dir"* Indica el directorio donde se encuentran los repositorios, en caso no indicarlo el sistema preguntará si se quiere usar el repositorio local. 
* Leer el directorio recibido como argumento inicial. 
* Dentro de cada sub directorio encontrado buscar y leer el archivo **package.json**
* El archivo **package.json** mapearlo a la clase *Repository* con los atributos: name, description,version y dependencies. 
* Crear una lista de objetos **Tree** para mapear cada repositorio y sus dependencias.
* Buscar en la lista de **Tree** que repositorios se ven afectados con el commit realizado. 
* Mostrar en consola los repositorios afectados por el commit.