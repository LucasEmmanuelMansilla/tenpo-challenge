# Tenpo Challenge

Este es un proyecto desarrollado con **Vite** y **React 19** que utiliza **TailwindCSS**, **React Query** y **React Router DOM** para la gestión del estado y el enrutamiento.

## Tecnologías utilizadas

- [Vite](https://vitejs.dev/) - Herramienta de construcción rápida para proyectos de frontend.
- [React 19](https://react.dev/) - Biblioteca para construir interfaces de usuario.
- [React Router DOM](https://reactrouter.com/) - Para la navegación entre páginas.
- [TailwindCSS](https://tailwindcss.com/) - Framework de utilidades CSS.
- [Context API](https://react.dev/reference/react/useContext) - Para la gestión del estado global.
- [TanStack React Query](https://tanstack.com/query/latest) - Para la gestión de datos asíncronos.
- [Axios](https://axios-http.com/) - Cliente HTTP para hacer solicitudes a API.
- [Lucide React](https://lucide.dev/) - Librería de iconos.
- [ESLint](https://eslint.org/) - Para la calidad y formato del código.

## Requisitos previos

Asegúrate de tener instalado **Node.js** en tu sistema. Puedes verificarlo con:

```sh
node -v
npm -v
```

## Instalación

Clona el repositorio y accede al directorio del proyecto:

```sh
git clone https://github.com/tu-usuario/tenpo-challenge.git
cd tenpo-challenge
```

Instala las dependencias:

```sh
npm install
```

## Scripts disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Compila la aplicación para producción.
- **`npm run preview`**: Previsualiza la versión compilada.
- **`npm run lint`**: Ejecuta ESLint para detectar errores en el código.

## Uso

Para iniciar el entorno de desarrollo:

```sh
npm run dev
```

Luego, abre el navegador en [http://localhost:5173](http://localhost:5173).

## Estructura del proyecto

```
📦 tenpo-challenge
├── 📂 src
│   ├── 📂 components      # Componentes reutilizables
│   ├── 📂 pages           # Páginas principales
│   ├── 📂 context         # Context API
│   ├── 📂 config          # Configuración de la API
│   ├── 📂 assets          # Recursos estáticos
│   ├── 📂 service         # Servicios
│   ├── main.tsx          # Punto de entrada de la app
│   ├── App.tsx           # Componente raíz
├── 📂 public             # Archivos estáticos
├── .eslintrc.js          # Configuración de ESLint
├── tailwind.config.js    # Configuración de TailwindCSS
├── tsconfig.json         # Configuración de TypeScript
└── vite.config.ts        # Configuración de Vite
```


