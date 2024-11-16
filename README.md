# Descripcion

## Correr proyecto dev

1. clonar repo
2. Crear copia de ~.env~ y renombrarlo a ~.env.template~ y cambiar variables de entorno
3. instalar dependencias ``` npm install / npm i```
4. Levantar base de datos ```Docker compose up -d```
5. Intalacion de prisma
6. conectar el gestyor de base de datos al docker(Dbeaver / TablePlus)
7. Crear el pull( el pull es basicamente tomar la base de datos y crear el shchema.prisma, y asi poder editar este) ``` npx prisma db pull ```
8. luego de crear o modificar el schema.prisma vamos a ejecutar el comando para actualizarlo en la base de datos ``` npx prisma migrate dev --name ProductCategoery``` esto permite crear la base de datos, o sobreescribirla
9.  correr proyecto ``` npm run dev ```


9.5 Para efectos de desarrollo ejecutaremos el siguente comando que nos permitira ejecutar codigo de typescript en node ```npm i -D ts-node ```
9.5.1 Para ejecutar la semilla(Seed-databse) iremos a la carpeta de esta desde la terminal => cd src/seed/
    luego usaremos el comando ```npx tsc --init``` asi crearemos un tsconfig poara correr la semilla
    para correr la semilla usaremos el comando ``` npm run seed ```, este comando lo creamos en package.json ( "seed": " ts-node src/seed/seed-database.ts" )
9.5.2 Generar el cliente de Primsa ```npx prisma generate```

## Correr proyecto en pro




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Desarrollo
 se estan utilizando iconos de ionic
 se instala de esta forma

 ```bash
 npm i react-icons --save
```
 
 Agregado de Zustand

 ```bash
 npm install zustand
```


 Agregar clsx, este permite agregar clases condicionales de tailwind

 ```bash
 npm i clsx
```

 Agregar swiper libreria de slide para img

```bash
 npm install swiper
```

## Instalacion de prisma

```
npm install prisma --save-dev
```
npx prisma init --datasource-provider PostgreSQL


Agregar nextAuth

documentacion
https://nextjs.org/learn/dashboard-app/adding-authentication
(Revisar el release ) https://github.com/nextauthjs/next-auth
https://github.com/nextauthjs/next-auth/pull/11666

pnpm i next-auth@beta


Importante

luego de hacer la instalacion de nextAuth debemos ejecutar este comando 
openssl rand -base64 32
en gitBash, asi nos genera una contrasena segura

(Este valor va a cambiar dependiendo el codigo que se ejecuta )4rAF/D/7SKfXzNF317ivn+ebhFYbZrTD9zEiUZY+3Zw=

## Instalacion zod

```
npm install zod
```

## Instalar bcrypot para la contrase;a del usuario

``` npm i bcryptjs```


## Migrar datos del prisma, es decir que estos datos son nuevos(usados para crear al usuario y el rol)

```npx prisma migrate dev --name user-role```


## Agregamos react form

```npm install react-hook-form```




warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started

## fin prisma


## Intslacion opara comprar por paypayl

``` npm i @paypal/react-paypal-js ```
``` npm i @paypal/paypal-js ```
npm uninstall @paypal/react-paypal-js

npm i @paypal/react-paypal-js@8.1.3



## npx prisma studio basicamente genera un visor de base de datos 


## Para la carma de imagenes, de momento se utilizara Cloudinary
Link de rerferencia : https://console.cloudinary.com/pm/c-8a675a24840cd22e10aad37632eff8/getting-started
npm i cloudinary
