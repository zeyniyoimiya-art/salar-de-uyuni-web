# 🏔️ Salar de Uyuni — Sitio Web

Sitio web informativo y turístico sobre el **Salar de Uyuni** (Potosí, Bolivia): el espejo natural más grande del mundo, con 10.582 km² de paisajes únicos.

![Salar de Uyuni](img/hero-salar.jpg)

## ✨ Características

- **Inicio** — hero con efecto parallax, tarjetas informativas y sección de maravillas
- **Información** — historia, datos generales, temporadas de visita, puntos de interés, cómo llegar y fuentes consultadas
- **Galería** — 12 fotografías con filtros por categoría (Salar / Incahuasi / Fauna) y lightbox con navegación
- **Contacto** — formulario con validación, datos de contacto y mapa
- Diseño **responsive** (móvil / tablet / escritorio) con menú lateral en móvil
- Botón "volver arriba", animaciones al hacer scroll y tipografías elegantes (Playfair Display + Montserrat + Open Sans)

## 🛠️ Tecnologías

- HTML5
- CSS3 (variables, grid, flexbox, media queries)
- JavaScript vanilla (lightbox, filtros de galería, validación de formulario, scroll reveal)
- Bootstrap 5.3 + Bootstrap Icons
- Google Fonts

## 🚀 Cómo ejecutarlo

El sitio es 100% estático: basta con abrir `index.html` en el navegador.

O, si prefieres servirlo localmente:

```bash
python -m http.server 8097
```

Y abrir [http://localhost:8097](http://localhost:8097)

## 📁 Estructura

```
salar-de-uyuni-web/
├── index.html
├── informacion.html
├── galeria.html
├── contacto.html
├── css/
│   └── estilos.css
├── js/
│   └── script.js
├── img/  (20 imágenes)
├── favicon.svg
└── .github/workflows/pages.yml   ← deploy automático a GitHub Pages
```

## 🌐 GitHub Pages

Este repositorio incluye un workflow (`.github/workflows/pages.yml`) que **despliega el sitio automáticamente** en GitHub Pages con cada push a `main`.

Una vez subido, el sitio queda publicado en:

`https://zeyniyoimiya-art.github.io/salar-de-uyuni-web/`

> También puedes activarlo manualmente en **Settings → Pages → Branch: `main` / carpeta `/ (root)`**.

## 👤 Autor

**Zenith** — 2026

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.
