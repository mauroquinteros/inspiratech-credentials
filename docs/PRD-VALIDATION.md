# PRD Addendum: Validación de acceso (Step 0)

> Este documento extiende el PRD principal (`PRD.md`). Hereda automáticamente: paleta de colores, tipografía, header, footer, responsive behavior y stack técnico. Solo documenta lo nuevo y específico de esta pantalla.

---

## 1. Objetivo

Agregar una pantalla previa de validación de código de acceso antes de que el usuario pueda interactuar con el generador de badges. Esta validación es intencionalmente "suave": un único código compartido para todos los estudiantes del programa, sin autenticación real ni backend.

**Justificación:** Inspira Tech envía el código por correo a los estudiantes inscritos. La pantalla actúa como filtro contra usuarios casuales que no son parte del programa, sin pretender ser una barrera de seguridad real.

---

## 2. Cambio en la arquitectura de estados

La app pasa de 3 a 4 estados. Renumeración:

| Antes | Ahora | Nombre |
|-------|-------|--------|
| — | **Estado 0** | Validación de código (NUEVO) |
| Estado 1 | Estado 1 | Zona de upload |
| Estado 2 | Estado 2 | Modal de recorte |
| Estado 3 | Estado 3 | Preview con foto aplicada |

El Estado 0 se muestra solo si el usuario no se ha validado previamente. Si ya validó antes (en una sesión anterior), salta directamente al Estado 1.

---

## 3. Flujo de usuario

1. Usuario entra a la app.
2. Hook de inicialización chequea `localStorage` por flag de validación previa.
3. Si está validado: redirige directamente al Estado 1 (montaje inicial sin renderizar la pantalla de validación).
4. Si no está validado: renderiza la pantalla del Estado 0.
5. Usuario ingresa el código en el input (autofocus al cargar).
6. Usuario presiona Enter o el botón con la flecha.
7. Loading artificial de ~400ms para que la validación se sienta real.
8. Comparación case-insensitive contra `VITE_ACCESS_CODE`:
   - **Match:** se guarda flag en `localStorage`, transición fade-out → fade-in al Estado 1.
   - **No match:** input se sacude (shake animation), aparece mensaje de error inline, el contenido del input se mantiene seleccionado para reescribir.

---

## 4. Layout de la pantalla

### Estructura

- Header (idéntico al resto de la app, ver PRD principal).
- Body con `min-height: calc(100vh - 72px)` para llenar el viewport.
- Background del body: `#fcf8fd` (surface).
- Contenido centrado vertical y horizontalmente.
- Padding: 32px.
- Contenedor de contenido: max-width 480px.

### Sin footer

La pantalla de validación intencionalmente NO incluye footer. Razón: minimizar distracciones y mantener el foco en la acción única.

---

## 5. Componentes de la pantalla

### 5.1 Ícono decorativo

- Posición: arriba del título, centrado.
- Contenedor circular de 80px de diámetro (72px mobile).
- Background: `linear-gradient(135deg, #4740ff 0%, #13ddd4 100%)` (action gradient).
- Icono Lucide `Lock`, color blanco, 36px (32px mobile).
- Shadow: `0px 10px 30px rgba(71, 64, 255, 0.2)`.
- Margin-bottom: 32px.

### 5.2 Título

- Texto: **"Bienvenido al programa"**
- Tipografía: `headline-lg` (Montserrat 700, 32px desktop / 26px mobile).
- Color: `#1b1b1f` (on-surface).
- Centrado, line-height 1.2, letter-spacing -0.02em.
- Margin-bottom: 12px.

### 5.3 Subtítulo

- Texto: **"Ingresa el código que recibiste por correo para crear tu badge"**
- Tipografía: `body-md` (Poppins 400, 16px).
- Color: `#46464f` (on-surface-variant).
- Centrado, max-width 400px, line-height 1.6.
- Margin-bottom: 32px.

### 5.4 Combo input + botón

Un solo contenedor visual que agrupa el input y el botón como una unidad.

**Contenedor:**
- Display: flex.
- Width: 100% del content container.
- Height: 56px desktop, 52px mobile.
- Background: white (`#ffffff`).
- Border: 1.5px solid `#c7c5d0` (outline-variant).
- Border-radius: 14px.
- Overflow: hidden.
- Transición: `all 200ms ease`.

**Estados del contenedor:**
- Default: border `#c7c5d0`.
- Focus (input enfocado): border 2px solid `#4740ff` + `box-shadow: 0 0 0 3px rgba(71, 64, 255, 0.1)`.
- Error: border 2px solid `#ba1a1a` + shake animation (3 sacudidas horizontales de 4px, duración total 400ms).

**Input (lado izquierdo):**
- Flex: 1.
- Border: none, outline: none.
- Background: transparent.
- Padding: 0 20px.
- Font: Poppins 500, 16px.
- Color: `#1b1b1f`.
- Placeholder: **"Tu código de acceso"**.
- Placeholder color: `#777680` (outline).
- Letter-spacing: 0.5px.
- `text-transform: uppercase` (visual; la comparación interna ya es case-insensitive).
- Autofocus al cargar la pantalla.
- `aria-label="Código de acceso"`.

**Botón (lado derecho, cuadrado):**
- Width: igual al height del contenedor (56px desktop, 52px mobile).
- Height: 100%.
- Background activo (input con texto): `linear-gradient(135deg, #4740ff 0%, #13ddd4 100%)`.
- Background inactivo (input vacío): `#e5e1e6` (surface-container-highest).
- Icono Lucide `ArrowRight`, 24px.
- Color del icono activo: blanco.
- Color del icono inactivo: `#777680` (outline).
- Sin border-radius (vive dentro del contenedor redondeado).
- Cursor: pointer cuando activo, not-allowed cuando inactivo.
- Hover (cuando activo): icono se desliza 2px a la derecha (`transform: translateX(2px)`).
- Transición: `all 200ms ease`.
- `aria-label="Validar código"`.

**Estado loading del botón:**
- Mientras valida (~400ms), el icono `ArrowRight` se reemplaza por `Loader2` con animación de rotación continua.
- El input se deshabilita visualmente (opacidad 0.6) durante este estado.

### 5.5 Mensaje de error

Visible solo cuando la validación falla.

- Posición: debajo del combo input + botón.
- Margin-top: 12px.
- Background: `#ffdad6` (error-container).
- Color de texto: `#93000a` (on-error-container).
- Border-radius: 10px.
- Padding: 10px 14px.
- Font: Poppins 500, 14px.
- Layout: flex row, gap 8px, items-center.
- Icono Lucide `AlertCircle` 16px a la izquierda, color `#93000a`.
- Texto: **"El código no es correcto. Revisa tu correo o contáctanos si tienes dudas."**
- Animación de aparición: fade-in + slide-down (opacity 0 → 1, translateY 8px → 0, duración 200ms).
- Atributo `role="alert"` para que lectores de pantalla lo anuncien.
- Auto-dismiss: NO se oculta automáticamente; permanece visible hasta que el usuario vuelva a escribir.

**Comportamiento al volver a escribir:**
- Cuando el usuario modifica el contenido del input después de un error, el mensaje desaparece (fade-out 150ms) y el borde vuelve al estado default.

### 5.6 Link de soporte

- Posición: debajo del input combo (o del mensaje de error si está visible).
- Margin-top: 32px.
- Centrado.
- Layout: inline, una sola línea.

**Estructura:**
- Texto pre-link: **"¿No tienes tu código?"** en color `#46464f`, Poppins 400, 14px.
- Espacio + link.
- Link: **"Escríbenos por WhatsApp"** en color `#4740ff`, Poppins 600, 14px.
- Icono Lucide `MessageCircle` 14px a la izquierda del texto del link, gap 4px, mismo color que el texto.

**Estados del link:**
- Default: color `#4740ff`.
- Hover: color `#13ddd4` (turquoise) + underline.
- URL: `https://wa.me/51956322363` (placeholder a reemplazar).
- `target="_blank"` y `rel="noopener noreferrer"` (abre en nueva pestaña).

---

## 6. Lógica técnica

### 6.1 Variables de entorno

Agregar al `.env` del proyecto:

```env
VITE_ACCESS_CODE=INSPIRA2026
VITE_WHATSAPP_NUMBER=51999888777
```

Notas:
- `VITE_ACCESS_CODE`: el código compartido para todos los estudiantes. Cambiable sin redeploy si se maneja con build args en CI/CD.
- `VITE_WHATSAPP_NUMBER`: número en formato internacional sin `+` ni espacios (ej: `51999888777` para Perú).
- Agregar `.env` al `.gitignore` y crear `.env.example` con valores placeholder para documentación.

### 6.2 Constante de localStorage

```typescript
// constants/storage.ts
export const STORAGE_KEYS = {
  validated: 'inspira-badge-validated',
} as const;
```

### 6.3 Hook de validación

```typescript
// hooks/useAccessValidation.ts
import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants/storage';

export function useAccessValidation() {
  const [isValidated, setIsValidated] = useState<boolean>(() =>
    localStorage.getItem(STORAGE_KEYS.validated) === 'true'
  );

  const validateCode = useCallback(async (input: string): Promise<boolean> => {
    // Delay artificial para que la validación se sienta real
    await new Promise(resolve => setTimeout(resolve, 400));

    const expected = import.meta.env.VITE_ACCESS_CODE?.toUpperCase().trim();
    const provided = input.toUpperCase().trim();
    const isValid = !!expected && provided === expected;

    if (isValid) {
      localStorage.setItem(STORAGE_KEYS.validated, 'true');
      setIsValidated(true);
    }

    return isValid;
  }, []);

  return { isValidated, validateCode };
}
```

### 6.4 Integración en App.tsx

```typescript
// App.tsx (pseudocódigo)
function App() {
  const { isValidated, validateCode } = useAccessValidation();

  return (
    <>
      <Header />
      {!isValidated ? (
        <ValidationScreen onValidated={validateCode} />
      ) : (
        <BadgeGenerator /> {/* lo que ya existía como Estado 1, 2, 3 */}
      )}
    </>
  );
}
```

### 6.5 Helper de desarrollo

Para facilitar el testing local, exponer un helper global en modo dev:

```typescript
// main.tsx (o donde se haga el bootstrap)
if (import.meta.env.DEV) {
  (window as any).__resetValidation = () => {
    localStorage.removeItem('inspira-badge-validated');
    location.reload();
  };
  console.log(
    '%c💡 Tip: ejecuta __resetValidation() en consola para resetear la validación',
    'color: #4740ff; font-weight: bold;'
  );
}
```

Esto permite resetear la pantalla desde DevTools sin tener que ir a Application → Storage manualmente.

---

## 7. Estructura de archivos (actualización)

Agregar al `src/` definido en el PRD principal:

```
src/
├── components/
│   ├── ValidationScreen.tsx        ← NUEVO
│   └── ...
├── hooks/
│   ├── useAccessValidation.ts      ← NUEVO
│   └── ...
├── constants/
│   ├── storage.ts                  ← NUEVO
│   └── ...
```

---

## 8. Animaciones específicas

### 8.1 Shake animation (error)

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
```
- Duración: 400ms.
- Easing: ease-in-out.
- Se aplica al contenedor del input combo cuando hay error.
- Se quita inmediatamente después de la animación (no permanece).

### 8.2 Aparición del mensaje de error

```css
@keyframes errorAppear {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
```
- Duración: 200ms.
- Easing: ease-out.

### 8.3 Transición entre Estado 0 → Estado 1

Cuando la validación es exitosa:
- Fade-out del ValidationScreen: 200ms.
- Pequeña pausa de 100ms.
- Fade-in del Estado 1: 300ms.

Esto da una sensación de transición intencional sin sentirse abrupto.

---

## 9. Accesibilidad

- Input con `aria-label="Código de acceso"`.
- Botón con `aria-label="Validar código"`.
- Mensaje de error con `role="alert"` para ser anunciado por lectores de pantalla.
- Tab order: input → botón → link de soporte.
- Tecla Enter en el input dispara la validación.
- Estados focus visibles en todos los elementos interactivos.
- Contraste de colores cumple WCAG AA.

---

## 10. Validaciones del input

- Trim de espacios en blanco antes de validar.
- Comparación case-insensitive (uppercase ambos lados).
- Botón deshabilitado cuando el input está vacío o solo contiene espacios.
- No validación en tiempo real (solo al presionar Enter o el botón).
- Sin límite mínimo o máximo de caracteres (la validación de match es la única regla).

---

## 11. Variables a reemplazar (actualización)

Agregar a la tabla del PRD principal:

| Label | Qué reemplazar |
|-------|----------------|
| `VITE_ACCESS_CODE` | El código real que se enviará por correo a los estudiantes (en `.env`) |
| `51956322363` | Número de WhatsApp en formato internacional sin `+`, ej: `51999888777` |
| `VITE_WHATSAPP_NUMBER` | Mismo número que arriba, configurado como env variable (en `.env`) |

---

## 12. Out of scope

NO incluir en esta pantalla:

- Campo de email o username (solo el código).
- Checkbox "Recordarme" (la validación ya es persistente por diseño).
- Flujo de recuperación de código (el usuario debe contactar soporte).
- Botón de signup o registro (no aplica, no hay cuentas).
- Login con redes sociales o SSO.
- Patrones decorativos o ilustraciones de fondo más allá del icono.
- Copy de marketing o beneficios del programa.
- Banner de cookies.
- Links a Términos o Privacidad en esta pantalla.
- Validación de formato del código (longitud, caracteres permitidos, etc).
- Rate limiting o bloqueo después de N intentos fallidos.
- Analytics de intentos fallidos.