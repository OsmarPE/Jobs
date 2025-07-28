import { db } from '../index';
import { users, job, enterprise, location } from './schema';
import { eq, and, desc, like } from 'drizzle-orm';

// Obtener todos los usuarios con su ubicación
export async function getUsers() {
  
    try {
      const data = await db
      .query
      .users
      .findMany({
        with:{
          location: true
        }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }


 

