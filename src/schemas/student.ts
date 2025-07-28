
import { eq } from 'drizzle-orm';
import { student } from '../db/schema';
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

export const createStudent = async ({name,grade,dateFrom,dateTo,skills}:NewStudent) => {
    
    try {
        const data = await db
            .insert(student)
            .values({
                name,
                grade,
                dateFrom,
                dateTo,
                skills
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
export const updateStudent = async (id: Student['id'], {name,grade,dateFrom,dateTo,skills}:UpdateStudent) => {

    try {
        const data = await db
            .update(student)
            .set({
                name,
                grade,
                dateFrom,
                dateTo,
                skills
            })
            .where(eq(student.id, id));

        return data
    } catch (error) {
        throw new Error(`Error updating student: ${error}`);
    }
}