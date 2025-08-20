import { getUserById, updateUser } from "@/src/schemas/user";
import { NextRequest, NextResponse } from "next/server";
import { existsSync, mkdir, mkdirSync, unlinkSync, writeFile, writeFileSync } from "node:fs";
import { join } from "node:path";

export async function PUT(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const id = formData.get("id") as string;
    
        const uploadsPath = join(process.cwd(), 'public','uploads');
        
        if (!existsSync(uploadsPath)) {
            mkdirSync(uploadsPath, { recursive: true });
        }

        if (!file) {
            return NextResponse.json({ message: "No se pudo subir el archivo", success: false, data: null }, { status: 400 });
        }
    
        const user = await getUserById(+id);

        if (!user){
            return NextResponse.json({ message: "Usuario no encontrado", success: false, data: null }, { status: 404 });
        }

        // transform File to Buffer
        const { cv } = user

        if (cv) {
            const cvPath = join(uploadsPath, cv);
            existsSync(cvPath) && unlinkSync(cvPath);
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        //concat path file upload with file name
        const fileName = `${file.name}`;
        const filePath = join(uploadsPath, fileName);

        // write file to uploads
        writeFileSync(filePath, buffer);

        const data = await updateUser(+id, { cv: fileName });
    
        if (!data) {
            return NextResponse.json({ message: "No se pudo subir el archivo", success: false, data: null }, { status: 400 });
        }
        
        return NextResponse.json({ message: "Archivo subido correctamente", success: true, data: null }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ message: "Error al subir el archivo", success: false, data: null }, { status: 500 });
    }
}