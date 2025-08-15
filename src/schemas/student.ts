
import { eq } from 'drizzle-orm';
import { student, users } from '../db/schema';
import { db } from '..';


export type Student = typeof student.$inferSelect;
export type NewStudent = typeof student.$inferInsert;
export type UpdateStudent = Partial<NewStudent>;


export const getStudents = async () => {
    try {

        const data = await db
            .select()
            .from(student);

        return data;
    } catch (error) {
        console.log(error);

    }
}

// Obtener estudiantes con información del usuario relacionado
export const getStudentsWithUser = async () => {
    try {
        const data = await db
            .select({
                id: student.id,
                userId: student.userId,
                name: student.name,
                grade: student.grade,
                dateFrom: student.dateFrom,
                dateTo: student.dateTo,
                user: {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    phone: users.phone,
                    avatar: users.avatar
                }
            })
            .from(student)
            .leftJoin(users, eq(student.userId, users.id));

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getStudentById = async (id: Student['id']) => {
    try {
        
        const data = await db
            .select()
            .from(student)
            .where(eq(student.id, id));

        return data;

    } catch (error) {
        
    }
}

export const getStudentByUserId = async (userId: NonNullable<Student['userId']>) => {
    try {
        
        const data = await db
            .select()
            .from(student)
            .where(eq(student.userId, userId));

        return data;

    } catch (error) {
        console.log(error);
    }
}

export const createStudent = async ({userId, name, grade, dateFrom, dateTo}: NewStudent) => {
    
    try {
        const data = await db
            .insert(student)
            .values({
                userId,
                name,
                grade,
                dateFrom,
                dateTo
            });

        return data
    } catch (error) {
        throw new Error(`Error registering student: ${error}`);
    }
}

export const deleteStudent = async (id: Student['id']) => {
    try {
        const data = await db
            .delete(student)
            .where(eq(student.id, id));

        return data
    } catch (error) {
        throw new Error(`Error deleting student: ${error}`);
    }
}
export const updateStudent = async (id: Student['id'], {userId, name, grade, dateFrom, dateTo}: UpdateStudent) => {

    try {
        const data = await db
            .update(student)
            .set({
                userId,
                name,
                grade,
                dateFrom,
                dateTo
            })
            .where(eq(student.id, id));

        return data
    } catch (error) {
        throw new Error(`Error updating student: ${error}`);
    }
}