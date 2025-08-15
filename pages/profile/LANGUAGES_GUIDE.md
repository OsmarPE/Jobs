# Guía de uso: ProfileLanguagesEdit

## Funcionalidad implementada

El componente `ProfileLanguagesEdit` ahora incluye:

### ✅ **Características principales:**
1. **Muestra los idiomas del usuario** - Lista actual de idiomas agregados
2. **Select con idiomas disponibles** - Solo muestra idiomas que el usuario no tiene
3. **Agregar idiomas** - Añade idiomas al perfil del usuario
4. **Eliminar idiomas** - Remueve idiomas con botón X
5. **Validaciones** - Previene agregar idiomas duplicados

### 📊 **Estructura de datos:**
```typescript
// Tabla languages - Catálogo de idiomas
{
  id: number,
  name: string
}

// Tabla user_languages - Relación N:N
{
  userId: number,
  languageId: number
}
```

### 🚀 **Uso del componente:**
```tsx
// El componente espera un userId en los searchParams
<ProfileLanguagesEdit open={isOpen} />

// URL ejemplo: /profile?languages=123
// Donde 123 es el ID del usuario
```

### 🔧 **Funciones del schema utilizadas:**

1. **`getLanguages()`** - Obtiene todos los idiomas disponibles
2. **`getUserLanguages(userId)`** - Obtiene idiomas del usuario con relaciones
3. **`addLanguageToUser(userId, languageId)`** - Añade idioma al usuario
4. **`removeLanguageFromUser(userId, languageId)`** - Elimina idioma del usuario

### 💡 **Flujo de trabajo:**

1. **Al abrir el diálogo:**
   - Carga todos los idiomas disponibles
   - Carga los idiomas actuales del usuario
   - Filtra idiomas disponibles para agregar

2. **Al agregar un idioma:**
   - Valida que no sea duplicado
   - Inserta en la tabla `user_languages`
   - Actualiza la lista local
   - Muestra confirmación

3. **Al eliminar un idioma:**
   - Elimina de la tabla `user_languages`
   - Actualiza la lista local
   - Muestra confirmación

### 🎨 **UI/UX features:**
- **Loading states** - Indicadores de carga
- **Error handling** - Manejo de errores con toast
- **Disabled states** - Botones deshabilitados cuando corresponde
- **Empty states** - Mensajes cuando no hay idiomas
- **Visual feedback** - Badges con botón de eliminar

### 📝 **Ejemplo de uso completo:**

```tsx
// En tu página de perfil
import { useState } from 'react';
import ProfileLanguagesEdit from '@/pages/profile/ProfileLanguagesEdit';

export default function ProfilePage() {
  const [showLanguages, setShowLanguages] = useState(false);
  const userId = 123; // ID del usuario actual

  const handleOpenLanguages = () => {
    // Agregar userId a los searchParams
    router.push(`/profile?languages=${userId}`);
    setShowLanguages(true);
  };

  return (
    <div>
      <button onClick={handleOpenLanguages}>
        Editar idiomas
      </button>
      
      <ProfileLanguagesEdit open={showLanguages} />
    </div>
  );
}
```

### 🔄 **Estados del componente:**
- **Cargando** - Mientras obtiene datos
- **Mostrando idiomas** - Lista de idiomas del usuario
- **Agregando** - Formulario con select abierto
- **Vacío** - Cuando no hay idiomas agregados

### ⚠️ **Consideraciones:**
- El `userId` debe pasarse via searchParams con key `languages`
- Se requiere conexión a la base de datos
- Los toast notifications requieren el provider de Sonner
- Las funciones del schema deben estar importadas correctamente
