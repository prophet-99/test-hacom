FRONTEND APP
-------------------------
SPA desarrollada con:
Angular 18
Apache Echarts
Angular Material
AG Grid


BACKEND APP
-------------------------
API rest desarrollada con:
Java 21
Spring 3.4.5
Spring Reactive web
Lombok
Spring Data Reactive MongoDB
Spring Boot DevTools
Spring Doc
MongoDB

URL API:
http://localhost:8080/api

Se expone la documentación de la api en la siguiente ruta:
http://localhost:8080/webjars/swagger-ui/index.html

Url base de datos:
mongodb://localhost:27017/prueba



INSTRUCTIONS - MANUAL
------------------------
FRONTEND:
npm i
npx ng serve -o

BACKEND:
./gradlew clean build
./gradlew bootRun

DB
mongorestore --uri="mongodb://localhost:27017" "prueba"

IMPORTANTE: Importar los datos de pruebas de Mongo para tener mejor experiencia en el Front.