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

##Propiedades de una ventana de Electron
