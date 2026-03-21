Markdown
# Streetwear Identity Kit 👕

Una aplicación web moderna y profesional para la gestión de identidad en marcas de ropa (Streetwear), construida con un enfoque en el rendimiento, la escalabilidad y una experiencia de usuario excepcional.

## 🚀 Tecnologías Principales

Este proyecto utiliza un stack tecnológico de vanguardia:

* **Frontend:** [React 18](https://reactjs.org/) con [TypeScript](https://www.typescriptlang.org/) para un desarrollo robusto y tipado.
* **Build Tool:** [Vite](https://vitejs.dev/) - Proporciona un entorno de desarrollo ultrarrápido.
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para un diseño responsivo y moderno.
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/) - Componentes accesibles y personalizables basados en Radix UI.
* **Backend / Auth:** [Supabase](https://supabase.com/) - Integración para autenticación y base de datos en tiempo real.

## 🛠️ Estructura del Proyecto

El proyecto sigue una arquitectura organizada y fácil de mantener:

```text
src/
├── components/     # Componentes de UI (Shadcn) y secciones reutilizables
├── contexts/       # Contextos globales (Auth, Carrito, etc.)
├── hooks/          # Custom hooks para lógica compartida
├── integrations/   # Configuración de servicios externos (Supabase)
├── pages/          # Vistas principales de la aplicación
└── lib/            # Funciones de utilidad y configuración de librerías
