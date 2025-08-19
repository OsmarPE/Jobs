import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import FormSubmit from "@/components/ui/form-submit";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  getAllLanguagesAction, 
  getUserLanguagesAction, 
  addLanguageToUserAction, 
  removeLanguageFromUserAction 
} from "@/actions/languages";

type Language = {
    id: number;
    name: string;
};

type UserLanguage = {
    userId: number;
    languageId: number;
    language: Language;
};

export default function ProfileLanguagesEdit({ open }: { open: boolean }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams?.get('add-languages');
    
    const [status, setStatus] = useState<null | 'add'>(null);
    const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
    const [userLanguages, setUserLanguages] = useState<UserLanguage[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [loading, setLoading] = useState(false);

    // Cargar lenguajes disponibles y del usuario
    useEffect(() => {
        const loadData = async () => {
            if (!userId) return;
            try {
                setLoading(true);
                
                // Cargar todos los lenguajes disponibles
                const allLanguagesResponse = await fetch('/api/languages');
                const res = await allLanguagesResponse.json();
                console.log(res);
                
                if (allLanguagesResponse.ok && res.data) {
                    setAvailableLanguages(res.data);
                }
                
                // Cargar lenguajes del usuario
                const userLangsResponse = await getUserLanguagesAction(Number(userId));
                if (userLangsResponse.success && userLangsResponse.data) {
                    setUserLanguages(userLangsResponse.data);
                }
                
            } catch (error) {
                console.error('Error loading languages:', error);
                toast.error('Error al cargar los idiomas');
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            loadData();
        }
    }, [open, userId]);

    const handleCancel = () => {
        router.back();
    };

    const handleAddLanguage = () => {
        setStatus(prevStatus => prevStatus === 'add' ? null : 'add');
        setSelectedLanguage("");
    };

    const handleSubmitLanguage = async () => {
        if (!selectedLanguage || !userId) return;
        
        try {
            setLoading(true);
            
            const languageId = Number(selectedLanguage);
            
            // Verificar si el usuario ya tiene este idioma
            const hasLanguage = userLanguages.some(ul => ul.languageId === languageId);
            if (hasLanguage) {
                toast.error('Ya tienes este idioma agregado');
                return;
            }
            
            // Agregar idioma al usuario usando server action
            const response = await addLanguageToUserAction(Number(userId), languageId);
            
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            
            // Recargar idiomas del usuario
            const updatedUserLanguagesResponse = await getUserLanguagesAction(Number(userId));
            if (updatedUserLanguagesResponse.success && updatedUserLanguagesResponse.data) {
                setUserLanguages(updatedUserLanguagesResponse.data);
            }
            
            toast.success(response.message);
            setStatus(null);
            setSelectedLanguage("");
            
        } catch (error) {
            console.error('Error adding language:', error);
            toast.error('Error al agregar el idioma');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveLanguage = async (languageId: number) => {
        if (!userId) return;
        
        try {
            setLoading(true);
            
            const response = await removeLanguageFromUserAction(Number(userId), languageId);
            
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            
            // Actualizar la lista local
            setUserLanguages(prev => prev.filter(ul => ul.languageId !== languageId));
            
            toast.success(response.message);
            
        } catch (error) {
            console.error('Error removing language:', error);
            toast.error('Error al eliminar el idioma');
        } finally {
            setLoading(false);
        }
    };

    // Filtrar idiomas disponibles que el usuario no tiene
    const availableToAdd = availableLanguages.filter(
        lang => !userLanguages.some(ul => ul.languageId === lang.id)
    );
    return (
        <Dialog open={open} onOpenChange={() => router.back()}>
            <DialogContent className="bg-background-landing">
                <DialogHeader>
                    <DialogTitle>Lenguajes</DialogTitle>
                    <DialogDescription>
                        Selecciona los lenguajes que dominas para mejorar tu perfil.
                    </DialogDescription>
                </DialogHeader>
            
                
                {/* Lista de idiomas del usuario */}
                <div className="space-y-3">
                    <Label>Tus idiomas:</Label>
                    {userLanguages.length > 0 ? (
                        <ul className="flex flex-wrap gap-3">
                            {userLanguages.map((userLang) => (
                                <li 
                                    key={userLang.languageId} 
                                    className="language__item badge relative"
                                >
                                    {userLang.language.name}
                                    {!status && <button
                                        className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-background-landing text-white size-5 grid place-items-center"
                                        onClick={() => handleRemoveLanguage(userLang.languageId)}
                                        disabled={loading}
                                    >
                                        <X size={10} />
                                    </button>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No tienes idiomas agregados</p>
                    )}
                </div>

                {/* Formulario para agregar idioma */}
                {status === 'add' && (
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmitLanguage(); }}>
                        <Label>Añadir idioma</Label>
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Idiomas disponibles</SelectLabel>
                                    {availableToAdd.map((lang) => (
                                        <SelectItem key={lang.id} value={lang.id.toString()}>
                                            {lang.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="flex gap-2 justify-end">
                            <FormSubmit 
                                type="button" 
                                onClick={handleSubmitLanguage}
                                loading={loading}
                                disabled={!selectedLanguage}
                            >
                                Añadir
                            </FormSubmit>
                        </div>
                    </form>
                )}

                {/* Botón para mostrar/ocultar formulario */}
                <Button 
                    type="button" 
                    variant={'ghost'} 
                    size={'sm'} 
                    className="w-max ml-auto" 
                    onClick={handleAddLanguage}
                    disabled={loading || availableToAdd.length === 0}
                >
                    {status === 'add' ? 'Cancelar' : (
                        <>
                            <Plus />
                            Añadir idioma
                        </>
                    )}
                </Button>

                {availableToAdd.length === 0 && userLanguages.length > 0 && (
                    <p className="text-gray-500 text-sm">Ya tienes todos los idiomas disponibles</p>
                )}

                <div className="flex justify-end gap-4 mt-4">
                    <Button type="button" variant="secondaryLanding" onClick={handleCancel}>
                        Cerrar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
