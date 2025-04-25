# 📰 Proyecto Página de Noticias de Tecnologías

¡Bienvenido a la mejor plataforma para mantenerte actualizado con las últimas tendencias del mundo tecnológico!
Este proyecto es una página web moderna y responsiva construida con **Vite + React**, que reúne noticias, recursos y comunidades sobre desarrollo web, inteligencia artificial, startups, blockchain y mucho más.

## 🚀 Funcionalidades principales

- **Home con noticias combinadas**: Muestra las noticias más recientes y relevantes de varias fuentes temáticas (IA, Machine Learning, Startups, Blockchain, Web Development), solo si tienen imagen y máximo 8 noticias.
- **Scroll suave en botones destacados**: El botón "Conoce más" en el carousel lleva suavemente a la sección de noticias. El botón "Quiero unirme" en la sección Corporate lleva suavemente a la zona de registro.
- **Extracción inteligente de imágenes**: Cada sección temática intenta extraer la mejor imagen disponible de cada noticia, mostrando un placeholder si no la hay.
- **Secciones temáticas**: Páginas dedicadas a Inteligencia Artificial, Machine Learning, Startups, Blockchain y Web Development, cada una con su propio feed de noticias.
- **Animaciones modernas**: Uso de AOS y Bootstrap para transiciones atractivas.
- **Diseño responsivo**: Adaptado para cualquier dispositivo.
- **Navegación intuitiva**: Menú principal con rutas claras a cada sección.
- **Inicio de sesión y registro**: Acceso y registro para personalizar la experiencia (estructura básica incluida).
- **Identidad visual personalizada**: Favicon y logo coherentes en toda la interfaz.

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/)
- [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
- CSS personalizado

## 📦 Instalación y ejecución

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/proyecto-noticias-tecnologia.git
   cd proyecto-noticias-tecnologia/vite-react-noticias
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   Visita [http://localhost:5173](http://localhost:5173)

## 📁 Estructura principal

```
vite-react-noticias/
├── public/
│   └── img/               # Imágenes y recursos gráficos
├── src/
│   ├── components/        # Componentes reutilizables (Header, Footer, NewsCards, etc.)
│   ├── pages/             # Páginas principales (Home, Login, Register, etc.)
│   ├── index.css          # Estilos globales
│   └── App.jsx            # Componente principal y rutas
├── package.json
└── README.md
```

## 👨‍💻 Autor

- Caleb Tobinson Cabrera - 

## 🌟 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para nuevas secciones, mejoras de diseño o funcionalidades, no dudes en hacer un fork y enviar tu pull request.

## 📜 Licencia

Este proyecto se distribuye bajo la licencia MIT.
