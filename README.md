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

## Mejoras V3
- Botón **WhatsApp** en cada transportista guardado para enviar sus datos directamente por WhatsApp.
- Botón **Editar** para actualizar chofer, CUIL, celular, dominio de chasis y dominio de acoplado cuando cambien.
- El mismo transportista puede reutilizarse sin volver a cargar todos sus datos.

## Mejoras V4
- Botón **Compartir flyer por WhatsApp**.
- En celular comparte el PNG por el panel nativo del sistema; WhatsApp aparece como opción si está instalado.
- En PC intenta copiar la imagen al portapapeles y abre WhatsApp Web para pegarla con Ctrl+V.
- Si el navegador no permite compartir archivos, descarga automáticamente el PNG.

## Mejoras V5
- Buscador con lupa para transportistas.
- Busca por transporte, chofer, CUIT, CUIL, teléfono, chasis o acoplado.
- Botón **Usar para guía** para elegir rápidamente chofer/unidad.
- Nuevos tipos de carga: **Cereal** y **Fertilizante**.
- Modalidad de tarifa configurable: **por bolsa, por tonelada, por viaje o sin mostrar precio**.
- Cereal queda por defecto en precio por tonelada.
- Harina queda por defecto sin mostrar precio.
- Nuevos fondos permanentes para Cereal y Fertilizante.
- Sigue funcionando sin base de datos y sin costo para uso en un solo dispositivo.

## Mejoras V6
- Cuando no se muestra precio, el flyer dice automáticamente **CONSULTAR TARIFA**.
- Debajo mantiene el texto **SE CARGA HOY** o **SE CARGA MAÑANA**.
- También aplica si el importe queda vacío.

## V7 COMPLETA — versión consolidada
Incluye todas las modificaciones pedidas hasta ahora:
- Logo y colores de Expreso Las Dos Marías dentro de la app, no en los flyers.
- Historias 9:16 con fondos permanentes para Papa, Harina, Ruta, Premium, Cereal y Fertilizante.
- Cargas con origen y destino libres.
- Opción HOY o MAÑANA.
- Tipos de carga: Papa, Harina, Cereal y Fertilizante.
- Tarifa por bolsa, por tonelada, por viaje o sin publicar precio.
- Si no se publica precio, el flyer muestra automáticamente CONSULTAR TARIFA.
- CTA en el flyer: RESPONDÉ ESTA HISTORIA PARA RESERVAR TU VIAJE.
- CTA inferior fijo: Comunicarse al 3814099809.
- Descargar flyer PNG y compartir flyer por WhatsApp.
- Guardar transportistas localmente en el dispositivo.
- Buscador con lupa por transporte, chofer, CUIT, CUIL, teléfono, chasis o acoplado.
- Editar transportista/chofer/unidad.
- Compartir datos del transportista por WhatsApp.
- Seleccionar transportista para Datos para guía.
- Generar y compartir mensaje con datos para guía.
- Cargas guardadas con estado Disponible / Asignada / Cerrada.
- Funcionamiento sin base de datos paga para uso en un solo dispositivo.
