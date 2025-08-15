# Guía para obtener la relación entre Users y Skills

## Estructura de la base de datos

La relación entre `users` y `skills` se maneja a través de una tabla intermedia `skillsUser`:

```
users (1) ←→ (many) skillsUser (many) ←→ (1) skills
```

### Tablas involucradas:

1. **users** - Información de usuarios
2. **skillsUser** - Tabla pivot que relaciona usuarios con sus habilidades
3. **skills** - Catálogo general de habilidades disponibles

## Funciones disponibles

### 1. Obtener skills de un usuario (Recomendada)
```typescript
import { getSkillsByUserId } from '@/src/schemas/skills';

const userSkills = await getSkillsByUserId(userId);
console.log(userSkills); // Array de skills del usuario
```

### 2. Obtener skills usando joins manuales
```typescript
import { getSkillsByUserIdWithJoin } from '@/src/schemas/skills';

const userSkills = await getSkillsByUserIdWithJoin(userId);
```

### 3. Agregar una skill a un usuario
```typescript
import { addSkillToUser } from '@/src/schemas/skills';

const newUserSkill = await addSkillToUser(userId, "JavaScript");
```

### 4. Remover una skill de un usuario
```typescript
import { removeSkillFromUser } from '@/src/schemas/skills';

await removeSkillFromUser(userId, skillId);
```

## Ejemplo de uso completo

```typescript
// En tu API route o server action
export async function getUserWithSkills(userId: number) {
  try {
    // Obtener skills del usuario
    const userSkills = await getSkillsByUserId(userId);
    
    // También puedes obtener el usuario con sus skills en una sola consulta
    const userWithSkills = await db
      .query
      .users
      .findFirst({
        where: eq(users.id, userId),
        with: {
          skills: true,
          experiences: true,
          educations: true
        }
      });
    
    return {
      user: userWithSkills,
      skills: userSkills
    };
  } catch (error) {
    console.error('Error fetching user with skills:', error);
    throw error;
  }
}
```

## En tu componente React

```typescript
import { useEffect, useState } from 'react';

export function UserSkillsComponent({ userId }: { userId: number }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch(`/api/users/${userId}/skills`);
        const userSkills = await response.json();
        setSkills(userSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, [userId]);

  if (loading) return <div>Cargando skills...</div>;

  return (
    <div>
      <h3>Habilidades del usuario</h3>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## API Route de ejemplo

```typescript
// app/api/users/[id]/skills/route.ts
import { getSkillsByUserId } from '@/src/schemas/skills';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const skills = await getSkillsByUserId(userId);
    
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching user skills' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const { skillName } = await request.json();
    
    const newSkill = await addSkillToUser(userId, skillName);
    
    return NextResponse.json(newSkill);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error adding skill to user' },
      { status: 500 }
    );
  }
}
```
