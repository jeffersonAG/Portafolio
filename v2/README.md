# Jefferson // Portfolio V2

Segunda generación del portafolio personal. Esta carpeta se desarrolla de forma aislada para no alterar la versión pública actual.

## Objetivos

- Mantener la identidad visual negra/crimson y la estética de terminal.
- Sustituir posicionamiento absoluto por un layout responsive con Grid/Flexbox.
- Convertir los bloques repetidos en componentes reutilizables.
- Mejorar accesibilidad y rendimiento.
- Mantener el globo tecnológico como elemento visual principal.
- Preparar el proyecto para despliegue futuro en GitHub Pages o hosting propio.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

> La rama `main` no debe modificarse hasta que esta versión sea validada.

## Contacto

La integración está en `src/services/contact.js` y conserva el servicio, la plantilla y la clave pública de EmailJS usados por el portafolio original. Nunca se debe incorporar una clave privada al navegador.

Si falla un envío, el formulario conserva el mensaje y permite abrir **Ver detalle del error** para consultar el estado HTTP y la respuesta de EmailJS. Una respuesta aceptada por la API no acredita la entrega final en el buzón. Un rechazo por configuración, dominio permitido, cuota o conexión del proveedor de correo requiere corregir ese dato en la cuenta de EmailJS; no se resuelve cambiando la URL de la API.

El formulario debe abrirse desde HTTP o HTTPS, no desde `file://`. Una solicitud sin respuesta se cancela a los 15 segundos y no se reenvía automáticamente.

## Pruebas del contacto

```bash
npm test
```

Las pruebas simulan las respuestas de EmailJS, los fallos de red y el tiempo de espera; no envían correos reales. También se ejecutan antes de cada build.
