import Jobs from "@/pages/jobs/Jobs";
import { db } from "@/src";
import { job } from "@/src/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest ) => {

    const data = await db.select({
        min: sql`MIN(salary_min)`,
        max: sql`MAX(salary_max)`
    }).from(job).limit(1);


    const { min, max } = data[0] || { min: 0, max: 0 };

    const values = {
        min: Number(min) || 0,
        max: Number(max) || 20000
    }

    return NextResponse.json({ message: 'Rango salarial obtenido exitosamente', data: values, success: true });


}