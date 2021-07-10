# API en NodeJs usando patrón repositorio
Este proyecto crea un API usando el **patrón repositorio (Repository Pattern)** el cual consiste en separar la lógica que recupera los datos y los asigna a un modelo de entidad de la lógica de negocios que actúa sobre el modelo, esto permite que la lógica de negocios sea independiente del tipo de dato que comprende la capa de origen de datos

En la implementación de usa **Typescript**

Contenedor de inyección de dependencia **Awilix**

Framework web **express**


##  Scripts
Dentro del directorio
### `yarn install`
### `yarn run start:dev`


##  Base de datos

El proyecto hace uso del patrón repositorio y puede intercambiar entre una base de datos y otra, actualmente solo esta emplementado MySQL yMSSQL
se adjuntan los scripts para MySQL y MSSQL.

##  Pruebas unitarias con MOCHA

Incluye pruebas  a la capa de servicios para corroborar que se comporte de la manera esperada. 
Dichas pruebas no apuntan a una base de datos real, sino de una base de datos en memoria para facilitar la ejecución de las pruebas.