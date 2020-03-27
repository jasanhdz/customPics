# Electron

## ¿Qué es electron?

Electron nos permite crear aplicaciones de escritorio usando tecnologías Web como JavaScript, Html y Css.
Electron fue creado por Git Hub para su proyecto Atom editor.

### ¿Porque tecnologias web?

La web es multiplataforma por defecto, lo que busca elecron es estrapolar el uso de estas tecnologías garantizando integración con los recursos nativos en cada plataforma.

## ¿Cómo funciona Electron?

Electron tiene dos componentes, Node.js y Chromium.
Node.js se encarga del proceso principal que se usa para conectar con las partes nativas del SO, Chromium nos permite ver el contenido visual.

IPC es la forma como se envían mensajes entre los procesos de node.js y Chromium.

## Herramientas necesarias

- Node.js - https://nodejs.org/en/download/, recomendamos intalar la versión LTS.
- Si estas en Windows te recomendados intalar windows-build-tools, es un modulo NPM.
- Si estas en linux puedes descargar la ultima versión de Node.js del repositorio de
- Nodesource: https://github.com/nodesource/distributions
- Un editor de texto

## Creando el proyecto

Creación del proyecto Platzipcs usando npm.

`npm init -y`

Recuerda que aunque puedes tener instalado Electron globalmente lo mas recomendado es instalarlo localmente para cada proyecto.

`yarn add electron --dev`

Para iniciar el proyecto se recomienda crear un script en packages.json.

```json
{
  "scrips": {
    "dev": "electron"
  }
}
```

Ahora solo debemos correr el comando `yarn dev` o `npm run dev`

## Nuestra primera ventana

En esta parte del curso iniciamos con la creación de nuestra primera ventana en Electron, para esto es importante entender muy bien el uso del objeto App, es un objeto que nos permite controlar el ciclo de vida de la aplicación.

El objeto **BrowserWindow ** es el que nos permite cargar todo el contenido visual de la aplicación de escritorio.

La documentación oficial de Electron esta en: https://electron.atom.io/docs/

## Propiedades de una ventana de Electron

Cómo cargamos contenido a la ventana?, recuerda que estamos trabajando con una ventana de navegador, como es un navegador le podemos cargar archivos locales y archivos remotos, técnicamente el comando es el mismo pero debemos considerar que cuando cargamos archivos remotamente dependemos de la red lo que puede retrasar un poco la carga de la información.

## El frontend y Electron

Electron nos permite trabajar con tecnologías Web para crear aplicaciones de escritorio, Adrian nos muestra como crear una aplicación de prueba en la que usaremos HTML, CSS y JavaScript.
Comenzamos con el desarrollo de Platzipics, veamos como crear una estructura de directorios en nuestro proyecto que nos va a ayudar a mantenerlo organizado.

## Configurando nuestro frontend

El proyecto electron-compile, nos permite escribir en diferentes tecnologías que no están soportadas nativamente en HTML y compila el código en tiempo de ejecución.

Para ello tenemos que instalar electron compile y desinstalar electron normal com dependencia core.

```
yarn remove electron && yarn add electron-compile
```

También podemos instalar electron-prebuilt-compile que nos ayudar a soportar sintaxis de ECMASCRIPT 5

```
yarn add electron-prebuilt-compile --dev
```

Nos apoyaremos de una funcion para ejecutar el **LiveReload** ya que solo queremos hacerlo cuando estamos en desarrollo, está función la vamos a utilizar con una condición para activarla por medio de una variable de entorno.

En Windows instalemos la herramienta cross-env que nos permite que las variables de entorno que configuremos en package.json sean iguales para Windows, Linux y Mac.

```
npm install cross-env --save
```

file devtools

```js
import { enableLiveReload } from 'electron-compile';

module.exports = function devtools() {
  enableLiveReload();
};
```

Uso del LiveReload

```js
import devtools from './devtools';

if (process.env.NODE_ENV === 'development') {
  console.log('La variable de entorno funciono');
  devtools();
}
```

## Herramientas de desarrollo para Electron

DevTools, nos muestra las opciones de desarrollo de la ventana
que vamos a cargar. Electron-debug nos permite trabajar con opciones de
desarrollo en el ambiente de desarollo.

`yarn add electron-debug`

lo usamos activandolo en las devtools

```js
import { enableLiveReload } from 'electron-compile';
import electronDebug from 'electron-debug';

module.exports = function devtools() {
  enableLiveReload();
  electronDebug({
    showDevTools: true
  });
};
```

Nosotros como desarrolladores necesitamos medir diferentes metricas y verificar los procesos que ocurren con nuestra aplicación, electron-debug también podemos agregarle plugins y eso es posible gracias a devtron, el cual tenemos que instalarlo como dependencia de desarrollo, el se incluira automaticamente en nuestra ventana de devtools

``yarn add devtron --dev`

## Algunos frameworks recomendados

Si queremos que nuestras aplicaciones de escritorio luzcan como aplicaciones de escritorio podemos usar frameworks como Photon o Xel.

http://photonkit.com/ -_ Framework_ de Html y Css que usaremos en Platzipics

https://xel-toolkit.org/ - Hecho para aplicaciones Electron o Chrome muy parecido a material design.

## JavaScript en el frontend

Cuando usamos Electron en el frontend tenemos acceso al API del navegador el API de Node.js, y el API de Electron.
Es decir podemos tener acceso a las propiedades del Sistema Operativo, lo que es una ventaja muy significativa comparado con el desarrollo de aplicaciones Web.

## Accesando recursos de la máquina

Electron nos permite usar recursos nativos del sistema operativo, por esta razón es que tenemos dos procesos diferentes, el main process es el que tiene acceso a recursos como los diálogos del sistema, mensajes de error, portapapeles, etc.
Usamos el procesos principal para abrir diálogos del sistema para cargar imágenes a PlatziPics.
En la documentación de Electron revisamos lo relacionado con el objeto dialog https://electron.atom.io/docs/api/dialog/

## Leer archivos de directorios

Continuamos con la interacción con los recursos del Sistema Operativo, ya sabemos abrir un dialogo y seleccionar un directorio. En ésta clase vamos a aprender a seleccionar únicamente las imágenes de los directorios usando el modulo de npm is-image.

yarn add is-image
yarn add filesize

Con el modulo file-size podemos ver fácilmente el tamaño de los archivos.
