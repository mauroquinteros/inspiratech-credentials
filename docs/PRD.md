# PRD — Inspira Tech Badge Generator

Aplicación SPA en React + TypeScript que permite a los estudiantes del programa de Inspira Tech generar un badge personalizado con su foto, listo para compartir en redes sociales.

---

## 1. Resumen del producto

### 1.1 Objetivo

Crear una herramienta web simple y enfocada que permita a un estudiante del programa "No-code Builders desde cero" de Inspira Tech:

1. Subir una foto personal desde su dispositivo
2. Recortar y posicionar la foto dentro de un marco circular predefinido
3. Ver el resultado compuesto sobre un template gráfico de marca
4. Descargar la imagen final lista para publicar en redes (especialmente LinkedIn)

### 1.2 Alcance

Es una **SPA de una sola página y un solo flujo**. No tiene autenticación, navegación, base de datos, ni backend. Todo el procesamiento ocurre en el navegador del usuario.

### 1.3 Audiencia

Estudiantes activos del programa de Inspira Tech en Latinoamérica. Usan principalmente celulares y laptops. El idioma de la UI es español neutro latinoamericano.

---

## 2. Stack técnico

### 2.1 Tecnologías obligatorias

- **Framework:** React 18+ con TypeScript
- **Build tool:** Vite
- **Estilos:** Tailwind CSS
- **Crop de imagen:** `react-easy-crop` (npm)
- **Composición final:** Canvas API nativa del navegador (NO usar `html2canvas` por temas de calidad)
- **Descarga:** Blob + URL.createObjectURL

### 2.2 Estructura sugerida de carpetas

```
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BadgeGenerator.tsx       (orquestador principal)
│   ├── UploadZone.tsx           (estado inicial con drag & drop)
│   ├── CropModal.tsx            (modal de ajuste con react-easy-crop)
│   ├── BadgePreview.tsx         (resultado final compuesto)
│   └── DownloadButton.tsx
├── hooks/
│   └── useImageComposition.ts   (lógica de composición con Canvas API)
├── utils/
│   ├── canvasHelpers.ts         (funciones para componer y exportar)
│   └── constants.ts             (CIRCLE_POSITION, colores, etc.)
├── types/
│   └── index.ts
├── assets/
│   ├── logo.png                 → src/assets/inspiratech-logo.png
│   └── badge-template.jpg       → src/assets/inspiratech-template.jpg
├── App.tsx
└── main.tsx
```

---

## 3. Diseño visual

### 3.1 Paleta de colores (estricta)

Usar las variables CSS definidas a continuación. NO inventar colores adicionales.

```css
:root {
  /* Surfaces */
  --surface: #fcf8fd;
  --surface-bright: #fcf8fd;
  --surface-container-lowest: #ffffff;
  --surface-container-low: #f6f2f7;
  --surface-container: #f0edf1;
  --surface-container-high: #eae7ec;
  --surface-container-highest: #e5e1e6;
  --surface-dim: #dcd9de;

  /* Text */
  --on-surface: #1b1b1f;
  --on-surface-variant: #46464f;
  --outline: #777680;
  --outline-variant: #c7c5d0;

  /* Brand */
  --primary: #000000;
  --on-primary: #ffffff;
  --primary-container: #131643;
  --on-primary-container: #7d80b3;
  --inverse-primary: #c0c2f9;

  --secondary: #2b18ea;
  --on-secondary: #ffffff;
  --secondary-container: #4842ff;
  --on-secondary-container: #dfddff;

  --tertiary: #000000;
  --on-tertiary: #ffffff;
  --tertiary-container: #00201e;
  --on-tertiary-container: #00938d;

  /* Error */
  --error: #ba1a1a;
  --on-error: #ffffff;
  --error-container: #ffdad6;
  --on-error-container: #93000a;

  /* Fixed (acentos vibrantes) */
  --primary-fixed: #e0e0ff;
  --primary-fixed-dim: #c0c2f9;
  --secondary-fixed: #e2dfff;
  --secondary-fixed-dim: #c1c1ff;
  --tertiary-fixed: #4efaf1;
  --tertiary-fixed-dim: #13ddd4;

  /* Background */
  --background: #fcf8fd;
  --on-background: #1b1b1f;
}
```

**Gradientes derivados (usar tal cual):**

```css
--header-gradient: linear-gradient(135deg, #040535 0%, #4740ff 100%);
--action-gradient: linear-gradient(135deg, #4740ff 0%, #2ae5dc 100%);
```

### 3.2 Tipografía

Cargar desde Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Poppins:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**Escala tipográfica (definir en Tailwind config):**

| Token                | Font       | Size | Weight | Line-height | Letter-spacing |
| -------------------- | ---------- | ---- | ------ | ----------- | -------------- |
| `display-lg`         | Montserrat | 48px | 700    | 1.2         | -0.02em        |
| `headline-lg`        | Montserrat | 32px | 700    | 1.3         | normal         |
| `headline-lg-mobile` | Montserrat | 28px | 700    | 1.3         | normal         |
| `headline-md`        | Montserrat | 24px | 600    | 1.4         | normal         |
| `body-lg`            | Poppins    | 18px | 400    | 1.6         | normal         |
| `body-md`            | Poppins    | 16px | 400    | 1.6         | normal         |
| `body-sm`            | Poppins    | 14px | 400    | 1.5         | normal         |
| `label-bold`         | Poppins    | 14px | 600    | 1           | 0.05em         |
| `button`             | Poppins    | 16px | 600    | 1           | normal         |

### 3.3 Border radius

```js
rounded: {
  sm: '0.25rem',   // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  full: '9999px',
}
```

### 3.4 Espaciado y layout

- Base unit: 8px
- Container max-width: 1280px desktop
- Padding desktop: 64px lateral
- Padding mobile: 20px lateral
- Gap entre secciones grandes: 80px
- Gap entre elementos relacionados: 16-32px

### 3.5 Sombras

```css
--shadow-primary: 0px 10px 30px rgba(71, 64, 255, 0.08);
--shadow-primary-hover: 0px 10px 30px rgba(71, 64, 255, 0.12);
--shadow-cta: 0 8px 28px rgba(42, 229, 220, 0.4);
--shadow-cta-hover: 0 12px 36px rgba(42, 229, 220, 0.5);
--shadow-modal: 0 24px 64px rgba(4, 5, 53, 0.25);
```

---

## 4. Estructura de la página

### 4.1 Layout general

La página tiene tres zonas verticales:

1. **Header oscuro** (fijo en top, full-width)
2. **Cuerpo claro** (contenido principal, centrado, max-width 1280px)
3. **Footer claro** (borde superior sutil)

Corte duro entre header y cuerpo (sin transición de gradiente).

### 4.2 Header

- Full-width sticky bar
- Altura: 72px desktop, 64px mobile
- Background: `var(--header-gradient)`
- Padding horizontal: 64px desktop, 20px mobile
- Sin border-bottom ni shadow
- **Contenido único:** logo a la izquierda
  - Imagen: `src/assets/inspiratech-logo.png`
  - Altura: 36px desktop, 32px mobile
  - Es un link a `https://inspiratech.lat` (en la misma pestaña)
  - Si el logo no carga, mostrar fallback "Inspira Tech" en Montserrat 700 white
- **Lado derecho:** vacío (sin nav links, sin botones)

### 4.3 Cuerpo

- Background: `var(--background)` (#fcf8fd)
- Padding vertical: 64px top y 64px bottom desktop, 32px mobile
- Centrado, max-width 640px para el contenido del tool

#### 4.3.1 Sección intro (arriba del tool)

- **Heading:** "Crea tu badge del programa"
  - Estilo: `headline-lg` desktop, `headline-lg-mobile` mobile
  - Color: `var(--on-surface)`
  - Centrado, line-height 1.15
- **Subheading:** "Sube tu foto, ajústala y descárgala lista para compartir en redes"
  - Estilo: `body-lg`
  - Color: `var(--on-surface-variant)`
  - Centrado, max-width 480px, margin-top 16px
- Margin-bottom de la sección: 48px

#### 4.3.2 Sección tool (centro)

Contiene en orden vertical:

1. Contenedor 1:1 con upload o preview (descrito en sección 5)
2. Link "Cambiar foto" (solo si hay preview)
3. Botón "Descargar mi badge"

### 4.4 Footer

- Background: white (`--surface-container-lowest`)
- Border-top: 1px solid `var(--outline-variant)`
- Padding: 32px vertical, 24px horizontal
- Margin-top desde el final del tool: 80px
- **Contenido:** texto centrado en una sola línea
  - "Una herramienta de Inspira Tech · #NoCode #AutomatizacionesconIA"
  - Estilo: `body-sm`
  - Color: `var(--on-surface-variant)`
- Sin links adicionales

---

## 5. Flujo del usuario (4 estados)

### Estado 1: Inicial (sin foto subida)

**Contenedor principal:** 1:1 aspect ratio, max 560x560px, border-radius 24px (`xl`), overflow hidden.

**Composición visual del contenedor:**

1. **Capa base:** la imagen del template (`src/assets/inspiratech-template.jpg`) llena todo el contenedor con `object-fit: cover`. Es importante mostrar el template real desde el inicio para que el usuario vea cómo se va a ver el badge.

2. **Capa de overlay (encima del template):** semitransparente para invitar a subir la foto.
   - Background: `rgba(252, 248, 253, 0.88)` con `backdrop-filter: blur(8px)`
   - Border-radius: 24px (heredado del contenedor)
   - Cubre el 100% del contenedor

3. **Borde dashed (dentro del overlay):**
   - 2.5px dashed `#2ae5dc`
   - Inset de 16px del borde del contenedor
   - Border-radius: 16px

4. **Contenido centrado dentro del overlay:**
   - Icono circular: 80px de diámetro, background `var(--action-gradient)`, contiene icono de upload-cloud blanco de 40px
   - Margin-top 20px → texto "Arrastra tu foto aquí" (Poppins 600, 20px, color `var(--on-surface)`)
   - Margin-top 6px → texto "o haz clic para seleccionarla" (Poppins 400, 15px, color `var(--on-surface-variant)`)
   - Margin-top 16px → texto "PNG o JPG · Máximo 5MB" (Poppins 400, 12px, color `var(--outline)`, letter-spacing 0.3px)

**Comportamiento:**

- Drag & drop activo sobre todo el contenedor
- Click en cualquier parte del contenedor abre el file picker
- Hover state:
  - Borde dashed cambia a solid
  - Background del overlay se aclara a `rgba(224, 253, 251, 0.95)`
  - Cursor: pointer
  - Transición: all 200ms ease
- Drag-over state (cuando el usuario está arrastrando un archivo encima):
  - Borde se vuelve solid y de 3px
  - Background tinta hacia turquoise más visible
- Validaciones al subir archivo:
  - Solo aceptar tipos `image/png` e `image/jpeg`
  - Tamaño máximo: 5MB
  - Si falla validación: mostrar mensaje de error tipo toast en la parte superior del tool por 4 segundos. Color: `var(--error)`. Texto: "Solo PNG o JPG, máximo 5MB" o "El archivo es demasiado grande (máximo 5MB)" según el caso.

**Botón Descargar en este estado:**

- Disabled
- Background: `var(--surface-dim)`
- Texto: `var(--outline)`
- Sin shadow
- Cursor: not-allowed

### Estado 2: Crop modal abierto

**Trigger:** cuando el usuario selecciona un archivo válido, se abre automáticamente el modal de crop.

**Overlay:**

- Full-screen fixed
- Background: `rgba(4, 5, 53, 0.75)` con `backdrop-filter: blur(4px)`
- Click fuera del modal NO cierra (para evitar pérdida accidental). Solo cierra con Cancelar o X.

**Card del modal:**

- Desktop:
  - Background: `var(--surface-container-lowest)` (white)
  - Border-radius: 24px (xl)
  - Max-width: 540px
  - Padding: 32px
  - Centered vertical y horizontal
  - Shadow: `var(--shadow-modal)`
- Mobile:
  - Slides up desde el bottom
  - Border-radius: 24px 24px 0 0
  - Full-width
  - Padding: 24px
  - Pegado al bottom de la pantalla

**Header del modal (flex row, space-between):**

- Título: "Ajustar foto"
  - Estilo: `headline-md`
  - Color: `var(--on-surface)`
- Botón close (X):
  - Icono Lucide `X`, 24px
  - Color: `var(--outline)` con hover `var(--on-surface)`
  - Sin background, sin border
  - Clickeable area: 40x40px

**Separador:** border-bottom 1px `var(--outline-variant)` con margin-top 16px, margin-bottom 24px

**Área de crop:**

- Cuadrada 1:1
- Desktop: 400x400px
- Mobile: full-width minus padding
- Background: black (#000)
- Border-radius: 16px (lg)
- Overflow hidden
- Implementar con `react-easy-crop`:
  - `aspect={1}`
  - `cropShape="round"` (máscara circular)
  - `showGrid={false}`
  - `restrictPosition={true}`
  - El círculo de crop tiene border 2px solid white con shadow sutil
  - El área fuera del círculo se oscurece con `rgba(0, 0, 0, 0.55)`

**Slider de zoom (debajo del crop area, margin-top 20px):**

Flex row con tres elementos:

- Icono zoom-out (Lucide `ZoomOut`, 18px, color `var(--on-surface-variant)`)
- Slider (rango de zoom de 1 a 3):
  - Track: height 4px, background `var(--surface-container-high)`, border-radius 2px
  - Fill (de 0 al valor actual): `var(--action-gradient)`
  - Thumb: 20px círculo white, shadow `0 2px 8px rgba(4, 5, 53, 0.2)`, border 2px solid `#2ae5dc`
  - Width: flex-1 (ocupa todo el espacio horizontal disponible)
- Icono zoom-in (Lucide `ZoomIn`, 18px, color `var(--on-surface-variant)`)
- Gap entre elementos: 12px

**Helper text (debajo del slider, margin-top 12px):**

- Texto: "Arrastra la foto para reposicionar · Usa el deslizador para acercar"
- Estilo: `body-sm`
- Color: `var(--outline)`
- Centrado

**Botones de acción (footer del modal, margin-top 28px):**
Flex row, right-aligned, gap 12px.

- **Botón Cancelar (secundario):**
  - Background: white
  - Border: 1.5px solid `var(--outline-variant)`
  - Texto: "Cancelar", color `var(--on-surface-variant)`, Poppins 600, 15px
  - Padding: 12px 24px
  - Border-radius: 12px (md)
  - Hover: border `var(--outline)`, background `var(--surface-container-low)`
  - Acción: cierra el modal y vuelve al Estado 1. Limpia la foto subida.

- **Botón Aplicar (primario):**
  - Background: `var(--action-gradient)`
  - Texto: "Aplicar", color white, Poppins 600, 15px
  - Padding: 12px 32px
  - Border-radius: 12px (md)
  - Shadow: `0 4px 16px rgba(71, 64, 255, 0.3)`
  - Hover: opacity 0.9, scale 1.02, transición 200ms
  - Acción: genera la imagen recortada (canvas en memoria), guarda en estado, cierra modal, pasa al Estado 3.

### Estado 3: Preview (foto aplicada)

**Contenedor principal:** mismo 1:1, 560x560px, border-radius 24px.

**Composición visual del contenedor:**

- Aquí NO se muestra el JPG estático. Se muestra una **composición en tiempo real** generada con Canvas API:
  1. Capa base: template JPG completo
  2. Capa intermedia: la foto recortada del usuario, posicionada dentro de las coordenadas del círculo (ver sección 6)
- Shadow: `var(--shadow-primary)` con valores hover si se hace hover sobre el contenedor

**Link "Cambiar foto" (debajo del contenedor, margin-top 20px):**

- Centrado
- Icono refresh (Lucide `RefreshCw`, 16px, color `var(--secondary)`) a la izquierda
- Texto: "Cambiar foto", Poppins 500, 15px, color `var(--secondary)`
- Hover: underline + color shifts a `#2ae5dc`
- Gap entre icono y texto: 6px
- Acción: limpia el estado de la foto y vuelve al Estado 1.

**Botón Descargar (margin-top 32px):**

- Full width del contenedor (max 560px)
- Height: 64px
- Background: `#2ae5dc` (turquoise sólido, NO gradient)
- Texto: "Descargar mi badge", Poppins 700, 18px, color `#040535`
- Icono download (Lucide `Download`, 20px) a la izquierda del texto, gap 10px
- Border-radius: 16px (lg)
- Shadow: `var(--shadow-cta)`
- Hover: opacity 0.9, scale 1.02, shadow `var(--shadow-cta-hover)`
- Transición: all 200ms ease
- Acción: genera la imagen final en alta resolución y dispara la descarga (ver sección 6)

### Estado 4: Descarga completada

- Después de hacer click en "Descargar mi badge":
  - El navegador descarga el archivo automáticamente
  - Mostrar un toast en la parte superior del tool por 4 segundos:
    - Background: `var(--tertiary-container)` (#00201e)
    - Texto: "¡Listo! Tu badge se descargó correctamente"
    - Color del texto: `var(--on-tertiary-container)` (#00938d)
    - Icono check (Lucide `CheckCircle`, 18px) a la izquierda
    - Border-radius: 12px
    - Padding: 12px 20px
    - Shadow sutil
- El usuario permanece en el Estado 3 (puede descargar nuevamente o cambiar foto)

---

## 6. Lógica técnica: composición de la imagen

Esta es la parte más crítica del producto. La calidad del output depende de esta implementación.

### 6.1 Constantes a definir

En `utils/constants.ts`:

```typescript
// Posición del círculo dentro del template (en porcentajes del ancho/alto del template)
// AJUSTAR ESTOS VALORES segun el template real
export const CIRCLE_POSITION = {
  centerX: 0.5, // 50% del ancho (centrado horizontalmente)
  centerY: 0.38, // 38% del alto (mitad superior)
  radius: 0.3, // 30% del ancho del template (diámetro = 60% del ancho)
};

// Tamaño del archivo descargado (igual al template original)
// Detectar automáticamente desde la imagen cargada
export const TEMPLATE_NATURAL_SIZE = {
  // Se asignan en runtime cuando carga la imagen
  width: 1080,
  height: 1080,
};
```

**Nota para Mauro:** Los valores de `CIRCLE_POSITION` son aproximados, ajustar después de ver el primer build midiendo sobre el JPG real. Si el círculo no queda centrado correctamente, modificar solo estos tres números, no hace falta tocar más código.

### 6.2 Flujo de composición

**Cuando el usuario hace click en "Aplicar" en el modal de crop:**

1. `react-easy-crop` entrega los datos de crop (`croppedAreaPixels`)
2. Crear un canvas en memoria con la región recortada de la foto del usuario
3. Guardar ese canvas (o un Blob/dataURL) en el estado de la app

**Cuando el componente `BadgePreview` necesita renderizar:**

1. Crear un canvas con las dimensiones naturales del template (ej: 1080x1080)
2. Dibujar el template JPG como base usando `ctx.drawImage(templateImg, 0, 0)`
3. Calcular las coordenadas absolutas del círculo en píxeles:
   ```typescript
   const cx = templateWidth * CIRCLE_POSITION.centerX;
   const cy = templateHeight * CIRCLE_POSITION.centerY;
   const r = templateWidth * CIRCLE_POSITION.radius;
   ```
4. Aplicar clip circular:
   ```typescript
   ctx.save();
   ctx.beginPath();
   ctx.arc(cx, cy, r, 0, Math.PI * 2);
   ctx.closePath();
   ctx.clip();
   ```
5. Dibujar la foto del usuario centrada en (cx, cy) con tamaño que cubra el círculo:
   ```typescript
   ctx.drawImage(userCroppedImg, cx - r, cy - r, r * 2, r * 2);
   ctx.restore();
   ```
6. Convertir el canvas a una imagen visible en el DOM (`canvas.toDataURL('image/jpeg', 0.95)`)
7. Renderizar como `<img>` dentro del contenedor de pre
