# Validaciones

Esta carpeta contiene todas las validaciones de Zod organizadas por módulos.

## Estructura

- `auth.ts` - Validaciones relacionadas con autenticación (login, registro, etc.)
- `profile.ts` - Validaciones para el perfil del usuario (educación, experiencia, etc.)
- `job.ts` - Validaciones para trabajos y aplicaciones
- `index.ts` - Exporta todas las validaciones para fácil importación

## Uso

```typescript
// Importar validaciones específicas
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import { educationSchema, experienceSchema } from '@/lib/validations/profile';
import { jobCreateSchema } from '@/lib/validations/job';

// O importar todo desde el index
import { loginSchema, educationSchema, jobCreateSchema } from '@/lib/validations';
```

## Ejemplos

### Validación de formulario de login
```typescript
const form = useForm({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: '',
    password: '',
  },
});
```

### Validación de educación
```typescript
const form = useForm({
  resolver: zodResolver(educationSchema),
  defaultValues: {
    institution: '',
    title: '',
    dateFrom: '',
    dateTo: '',
    finished: false,
  },
});
```

### Validación en el servidor
```typescript
export async function POST(request: Request) {
  const data = await request.json();
  
  // Validar datos
  const validation = loginSchema.safeParse(data);
  
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues },
      { status: 400 }
    );
  }
  
  // Procesar datos validados
  const { email, password } = validation.data;
  // ...
}
```
