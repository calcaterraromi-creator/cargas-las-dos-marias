# Expreso Las Dos Marías — Cargas Hoy V2

Mini app web gratuita para:
- generar historias 9:16 para WhatsApp;
- elegir carga de Papa o Harina;
- seleccionar **HOY o MAÑANA**;
- origen y destino libres;
- precio por bolsa solo para Papa;
- cantidad de camiones;
- 4 fondos permanentes;
- descargar la historia como PNG;
- guardar cargas y marcarlas Disponible / Asignada / Cerrada;
- guardar datos de transportistas y choferes;
- armar automáticamente el mensaje con datos para la guía.

## Publicar gratis en GitHub Pages

1. Crear un repositorio nuevo en GitHub, por ejemplo `cargas-hoy`.
2. Subir TODO el contenido de esta carpeta, conservando la carpeta `assets`.
3. En GitHub: Settings → Pages.
4. En “Build and deployment”, seleccionar “Deploy from a branch”.
5. Branch: `main` y carpeta `/ (root)`.
6. Guardar. GitHub mostrará el enlace público en unos minutos.

## Importante

Los datos de cargas y transportistas se guardan en el navegador del dispositivo usando `localStorage`.
Eso permite que esta primera versión no necesite servidor ni base de datos paga.
Si después se necesita usar la app desde varios teléfonos compartiendo los mismos datos, se puede agregar una base gratuita como Supabase.

WhatsApp fijo en la plantilla: 3814099809


## Identidad visual
- Logo de Expreso Las Dos Marías visible solamente dentro de la aplicación.
- Los flyers generados NO llevan el logo.
- Paleta de la app basada en el logo: negro, rojo, blanco, verde y azul, con detalles dorados.
- Iconos PWA incluidos para agregar la app a la pantalla de inicio.
