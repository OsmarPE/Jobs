import { jobsApi } from '@/app/services/api'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import DragAndDrop from '@/components/ui/drag-on-drop'
import { Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import SkeletonCVUpload from './skeleton/SkeletonCVUpload'

export default function ProfileCVEdit({ userId }: { userId: number }) {

  const router = useRouter()
  const [file, setFile] = useState<File | null | undefined>(undefined)
  const [progress, setProgress] = useState<number>(0)

  const getData = async () => {
    const { data } = await jobsApi.getUserById(userId.toString())
    try {

    const fileName = data?.cv;
    
    if (!fileName) {
      setFile(null);
      throw new Error('No se encontró el CV');
    }
    const res = await fetch(`/uploads/${fileName}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const newFile = new File([blob], fileName, { type: 'application/pdf' })
    setFile(newFile);

  } catch (error) {
    toast.error("Error al cargar el CV");
  }
 
}

  useEffect(() => {
    if (userId) {
      getData();
    }

  }, [userId])


  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', userId.toString());

    try {
      const { message, success } = await jobsApi.sendUserCV(userId, file, (progress) => setProgress(progress));

      if (!success) {
        toast.error(message);
        return
      }

      toast.success(message);

      router.refresh();

    } catch (error) {
      toast.error("Error al subir el archivo");
    } finally {
      setProgress(0);
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent className='bg-background-landing'>
        <DialogTitle>Editar Curriculum</DialogTitle>
        <DialogDescription>
          Aqui puedes editar tu curriculum.
        </DialogDescription>
        <div className='mt-4'>
          { file !== undefined ? <DragAndDrop
            onFileSelect={(file) => setFile(file)}
            onFileRemove={() => setFile(null)}
            acceptedTypes={['.pdf']}
            files={file ? [file] : []}
            maxSizeInMB={10}
          /> : <SkeletonCVUpload />}

          <div className='mt-6'>
            <Button className='w-full' size={'lg'} onClick={handleUpload} disabled={progress > 0 || !file}>
              <Upload /> Subir Curriculum
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
