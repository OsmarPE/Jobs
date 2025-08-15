# Server Actions y API Routes para Languages

## 📁 Estructura creada

### Server Actions (`/actions/languages.ts`)
```typescript
- getAllLanguagesAction()         // Obtiene todos los idiomas
- getUserLanguagesAction(userId)  // Obtiene idiomas del usuario
- addLanguageToUserAction(userId, languageId)    // Añade idioma
- removeLanguageFromUserAction(userId, languageId) // Elimina idioma
```

### API Routes
```typescript
GET    /api/languages              // Obtiene todos los idiomas
GET    /api/users/[id]/languages    // Obtiene idiomas del usuario
POST   /api/users/[id]/languages    // Añade idioma al usuario
DELETE /api/users/[id]/languages    // Elimina idioma del usuario
```

## 🚀 Uso de Server Actions (Recomendado)

### En tu componente cliente:
```tsx
import { 
  getAllLanguagesAction, 
  getUserLanguagesAction, 
  addLanguageToUserAction, 
  removeLanguageFromUserAction 
} from "@/actions/languages";

// Obtener todos los idiomas
const response = await getAllLanguagesAction();
if (response.success) {
  setLanguages(response.data);
}

// Obtener idiomas del usuario
const userLangsResponse = await getUserLanguagesAction(userId);
if (userLangsResponse.success) {
  setUserLanguages(userLangsResponse.data);
}

// Agregar idioma
const addResponse = await addLanguageToUserAction(userId, languageId);
if (addResponse.success) {
  toast.success(addResponse.message);
}

// Eliminar idioma
const removeResponse = await removeLanguageFromUserAction(userId, languageId);
if (removeResponse.success) {
  toast.success(removeResponse.message);
}
```

## 🌐 Uso de API Routes (Alternativa)

### Usando fetch en componente cliente:
```tsx
// Obtener todos los idiomas
const fetchLanguages = async () => {
  const response = await fetch('/api/languages');
  const data = await response.json();
  if (data.success) {
    setLanguages(data.data);
  }
};

// Obtener idiomas del usuario
const fetchUserLanguages = async (userId: number) => {
  const response = await fetch(`/api/users/${userId}/languages`);
  const data = await response.json();
  if (data.success) {
    setUserLanguages(data.data);
  }
};

// Agregar idioma
const addLanguage = async (userId: number, languageId: number) => {
  const response = await fetch(`/api/users/${userId}/languages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ languageId })
  });
  const data = await response.json();
  if (data.success) {
    toast.success(data.message);
  }
};

// Eliminar idioma
const removeLanguage = async (userId: number, languageId: number) => {
  const response = await fetch(
    `/api/users/${userId}/languages?languageId=${languageId}`, 
    { method: 'DELETE' }
  );
  const data = await response.json();
  if (data.success) {
    toast.success(data.message);
  }
};
```

## ✅ Componente actualizado

El componente `ProfileLanguagesEdit.tsx` ahora:

1. **✅ Usa Server Actions** - Compatible con componentes cliente
2. **✅ Manejo de errores** - Respuestas estructuradas con success/error
3. **✅ Loading states** - Estados de carga apropiados
4. **✅ Toast notifications** - Feedback visual para el usuario
5. **✅ Revalidación** - Las server actions incluyen `revalidatePath()`

## 🔄 Flujo de datos

```
Cliente (React) → Server Action → Schema Function → Database
                ↓
              Response { success, data, message }
                ↓
            Update UI + Toast
```

## ⚠️ Consideraciones importantes

### Server Actions vs API Routes:
- **Server Actions**: Más directo, mejor para formularios y acciones
- **API Routes**: Más flexible, mejor para integraciones externas

### Revalidación:
- Las server actions incluyen `revalidatePath('/profile')`
- Esto actualiza automáticamente el cache de Next.js

### Error Handling:
- Todas las funciones retornan un formato consistente:
```typescript
{
  success: boolean,
  data: any | null,
  message: string
}
```

### TypeScript:
- Tipos compartidos entre cliente y servidor
- Validación en tiempo de compilación

## 📝 Ejemplo de uso completo

```tsx
"use client";
import { useState, useEffect } from 'react';
import { getAllLanguagesAction, getUserLanguagesAction } from '@/actions/languages';

export function LanguagesManager({ userId }: { userId: number }) {
  const [languages, setLanguages] = useState([]);
  const [userLanguages, setUserLanguages] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [allLangs, userLangs] = await Promise.all([
        getAllLanguagesAction(),
        getUserLanguagesAction(userId)
      ]);
      
      if (allLangs.success) setLanguages(allLangs.data);
      if (userLangs.success) setUserLanguages(userLangs.data);
    };
    
    loadData();
  }, [userId]);

  return (
    <div>
      {/* Tu UI aquí */}
    </div>
  );
}
```
