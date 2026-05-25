# Kura Chat — Asistente Virtual de Casa Kura

Chat conversacional con IA para atención al cliente de Casa Kura, construido con React + Vite e integrado con la API de Claude (Anthropic).

---

## Requisitos previos

- Node.js 18 o superior
- npm 9+ (o pnpm / yarn)
- API key de Anthropic ([console.anthropic.com](https://console.anthropic.com))

---

## Instalación rápida

```bash
# 1. Clona el repositorio
git clone https://github.com/dbjuancarlos/casa-kura-app.git
cd casa-kura-app

# 2. Instala las dependencias
npm install

# 3. Configura las variables de entorno
cp .env.example .env
# Abre .env y agrega tu API key de Anthropic

# 4. Levanta el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Estructura del proyecto

```
casa-kura-app/
├── KuraChatApp.jsx      # Componente principal del chat
├── KuraChatApp.css      # Estilos con design system Casa Kura
├── .env.example         # Plantilla de variables de entorno
├── SETUP_README.md      # Este archivo
├── src/
│   ├── main.jsx         # Entry point de React
│   └── App.jsx          # Componente raíz (importa KuraChatApp)
├── index.html
├── vite.config.js
└── package.json
```

---

## Integrar KuraChatApp en tu proyecto

### En `src/App.jsx`

```jsx
import KuraChatApp from "../KuraChatApp.jsx";

export default function App() {
  return <KuraChatApp />;
}
```

### En `src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## Variables de entorno

| Variable              | Requerida | Descripción                              | Default             |
|-----------------------|-----------|------------------------------------------|---------------------|
| `VITE_ANTHROPIC_API_KEY` | Sí     | API key de Anthropic                    | —                   |
| `VITE_CLAUDE_MODEL`   | No        | Modelo de Claude a usar                 | `claude-opus-4-7`   |
| `VITE_MAX_TOKENS`     | No        | Límite de tokens por respuesta          | `1024`              |

> Las variables `VITE_*` son accesibles en el navegador. Ver nota de seguridad abajo.

---

## Design System Casa Kura

### Paleta de colores

| Token               | Valor     | Uso                          |
|---------------------|-----------|------------------------------|
| `--kura-navy`       | `#1B2A4A` | Header, burbujas del usuario |
| `--kura-gold`       | `#C9A84C` | Acentos, botón enviar, puntos |
| `--kura-beige`      | `#F5EFE0` | Fondo del chat               |
| `--kura-white`      | `#FFFFFF` | Burbujas del asistente       |

### Personalización

Edita las variables CSS en `KuraChatApp.css` dentro del bloque `:root` para ajustar colores, radio de bordes y sombras sin modificar el componente.

---

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción en /dist
npm run preview  # Preview del build de producción
```

---

## Despliegue

### Vercel

```bash
npm install -g vercel
vercel --prod
```

Agrega `VITE_ANTHROPIC_API_KEY` en **Settings → Environment Variables** de tu proyecto en Vercel.

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## Nota de seguridad

Esta implementación llama directamente a la API de Anthropic desde el navegador usando el header `anthropic-dangerous-direct-browser-access: true`.

**Esto es adecuado para:**
- Demos internos
- Prototipos con acceso restringido
- Herramientas de uso interno del equipo

**Para producción pública**, implementa un backend proxy (Next.js API Route, Express, etc.) que reciba los mensajes del frontend y llame a la API de Anthropic del lado del servidor, sin exponer la key.

---

## Soporte

¿Dudas o problemas? Abre un issue en el repositorio o contacta al equipo de desarrollo.
