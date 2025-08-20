'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Upload, X, FileText, CheckCircle, AlertCircle, CloudUpload, Trash, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DragAndDropProps {
  onFileSelect: (file: File) => void
  onFileRemove?: (file?: File) => void
  acceptedTypes?: string[]
  maxSizeInMB?: number
  disabled?: boolean
  className?: string
  placeholder?: string
  multiple?: boolean,
  files?: FileWithPreview[],
  onChangeFile?: (file: File) => void
}

interface FileWithPreview extends File {
  preview?: string
}

export default function DragAndDrop({
  onFileSelect,
  onFileRemove,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt'],
  maxSizeInMB = 5,
  disabled = false,
  className,
  placeholder = 'Arrastra y suelta tu archivo aquí, o haz clic para seleccionar',
  multiple = false,
  files = []
}: DragAndDropProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>(files)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Validar archivo
  const validateFile = useCallback((file: File): string | null => {
    // Validar tamaño
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    if (file.size > maxSizeInBytes) {
      return `El archivo es demasiado grande. Máximo ${maxSizeInMB}MB permitido.`
    }

    // Validar tipo
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (acceptedTypes.length > 0 && !acceptedTypes.includes(fileExtension)) {
      return `Tipo de archivo no permitido. Formatos aceptados: ${acceptedTypes.join(', ')}`
    }

    return null
  }, [acceptedTypes, maxSizeInMB])

  // Manejar selección de archivo
  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    
    if (multiple) {
      // Si es múltiple, agregar al array
      setSelectedFiles(prev => [...prev, file])
    } else {
      // Si no es múltiple, reemplazar
      setSelectedFiles([file])
    }
    
    onFileSelect(file)
  }, [validateFile, onFileSelect, multiple])

  // Manejar drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      setIsDragOver(true)
    }
  }, [disabled])

  // Manejar drag leave
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  // Manejar drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    if (disabled) return

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [disabled, handleFileSelect])

  // Manejar click
  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [disabled])

  // Manejar cambio en input
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  // Remover archivo
  const handleRemoveFile = useCallback((fileToRemove?: FileWithPreview) => {
    if (fileToRemove) {
      setSelectedFiles(prev => prev.filter(f => f !== fileToRemove))
      if (onFileRemove) {
        onFileRemove(fileToRemove)
      }
    } else {
      setSelectedFiles([])
      if (onFileRemove) {
        onFileRemove()
      }
    }
    
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onFileRemove])

  const onChangeFile = (file: File) => {
    if (!multiple){
        setSelectedFiles([file]);
        return
    }
    setSelectedFiles(prev => [...prev, file])
  }

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  function openImageInNewWindow(fileName: string) {
    const imageUrl = `/uploads/${fileName}`;
    window.open(imageUrl, '_blank');
}


  return (
    <div className={cn(' space-y-4', className)}>
      {/* Área de Drag and Drop - siempre visible */}
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer',
          'hover:border-primary/50 hover:bg-secundary-landing/5',
          {
            'border-primary bg-primary/5': isDragOver && !disabled,
            'border-muted-foreground/25 bg-gray-900/5': !isDragOver && selectedFiles.length === 0 && !error,
            'opacity-50 cursor-not-allowed': disabled,
          }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={handleInputChange}
          disabled={disabled}
          multiple={multiple}
        />

        {/* Contenido del drag and drop */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={cn(
            'size-14 grid place-items-center bg-primary/10 rounded-full'
          )}>
            {error ? (
              <AlertCircle className="size-6 text-primary" />
            ) : (
              <CloudUpload className="size-6 text-primary" />
            )}
          </div>
    
          <div className="text-center">
            {selectedFiles.length > 0 ? ( 
                <p className="text-sm font-medium text-foreground mb-1">
                    {multiple ? 'Agregar más archivos' : isDragOver ? 'Suelta el archivo aquí' : 'Remplazar archivo'}
                </p> 
            ) : (
                <p className="text-sm font-medium text-foreground mb-1">
                    {isDragOver ? 'Suelta el archivo aquí' : placeholder}
                </p>
            )}
            <p className="text-xs text-muted-foreground">
              Formatos: {acceptedTypes.join(', ')} | Máximo: {maxSizeInMB}MB
            </p>
          </div>
        </div>

       
      </div>

      {/* Lista de archivos seleccionados */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            {multiple ? `Archivos seleccionados (${selectedFiles.length})` : 'Archivo seleccionado'}
          </h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center  p-3 rounded-lg"
              >
                <div className='flex-1 flex items-center gap-4'>
                    <div className="min-h-13 aspect-square flex items-center justify-center rounded-md bg-primary/5 border border-primary/10">
                        <FileText className="size-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground text-ellipsis">
                        {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                    </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <button onClick={() => openImageInNewWindow(file.name)} className='cursor-pointer text-white/50 hover:text-white rounded-full transition-colors' >
                        <Eye className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRemoveFile(file)}
                        className=" cursor-pointer text-white/50 hover:text-white rounded-full transition-colors"
                        disabled={disabled}
                    >
                        <Trash className="size-4" />
                    </button>
                    
                </div>
              </div>
            ))}
          </div>
          
          {/* Botón para limpiar todos los archivos */}
          {multiple && selectedFiles.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveFile()}
              className="text-xs text-red-600 hover:text-red-800 underline"
              disabled={disabled}
            >
              Remover todos los archivos
            </button>
          )}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="p-3 bg-primary/15 text-primary rounded-md">
          <div className="flex items-center gap-3">
            <AlertCircle className="size-5" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Estado de carga */}
      {isUploading && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            <p className="text-sm text-blue-700">Subiendo archivo...</p>
          </div>
        </div>
      )}
    </div>
  )
}
