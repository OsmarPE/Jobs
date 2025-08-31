import { Experience } from '@/src/schemas/experience';
import { User } from '@/src/schemas/user';
import { CreateCategory, CreateLocation, CreateSkill, Skill } from '@/types';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Tipos para las respuestas de la API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: Record<string, string[]>;
}

// Configuración base de axios
const apiConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Crear instancia de axios
const apiClient: AxiosInstance = axios.create(apiConfig);

// Interceptor para requests - agregar token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage o cookies
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejo de errores globales
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Manejo de errores de autenticación
    if (error.response?.status === 401) {
      // Limpiar token y redirigir al login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        // window.location.href = '/auth/login';
      }
    }
    
    // Manejo de errores del servidor
    if (error.response?.status >= 500) {
      console.error('Error del servidor:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// Clase API principal
class ApiService {
  // GET - Obtener datos
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // POST - Crear datos
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // PUT - Actualizar datos completos
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // PATCH - Actualizar datos parciales
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // DELETE - Eliminar datos
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Subir archivos
  async uploadFile<T = any>(url: string, file: File, userId: number, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', userId.toString());
      console.log(file);
      

      const config: AxiosRequestConfig = {
        headers: { 
          'Content-Type': 'multipart/form-data',
         },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      };
console.log(url);

      const response = await apiClient.put<ApiResponse<T>>(url, formData, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Manejo de errores
  private handleError(error: any): Error {
    if (error.response) {
      // Error de respuesta del servidor
      const message = error.response.data?.message || 'Error en el servidor';
      const status = error.response.status;
      throw new Error(`${status}: ${message}`);
    } else if (error.request) {
      // Error de red
      throw new Error('Error de conexión. Verifica tu conexión a internet.');
    } else {
      // Otro tipo de error
      throw new Error(error.message || 'Error desconocido');
    }
  }
}

// Crear instancia singleton
const api = new ApiService();

// Métodos específicos para tu aplicación
export const jobsApi = {
  // Jobs
  getAllJobs: (params?: Record<string, any>) => api.get('/job', { params }),
  getJobById: (id: string) => api.get(`/job/${id}`),
  createJob: (jobData: any) => api.post('/job', jobData),
  updateJob: (id: string, jobData: any) => api.put(`/job/${id}`, jobData),
  deleteJob: (id: string) => api.delete(`/job/${id}`),
  applyToJob: (jobId: string, applicationData: any) => api.post(`/job/${jobId}/apply`, applicationData),

  // Users
  getAllUsers: () => api.get('/users'),
  getUserById: (id: string) => api.get<User>(`/users/${id}`),
  updateUser: (id: string, userData: any) => api.put(`/users/${id}`, userData),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
  sendUserCV: (id: number, file: File, onProgress?: (progress: number) => void) => api.uploadFile(`/users/cv/upload`, file, id, onProgress),
  sendUserAvatar: (id: number, file: File, onProgress?: (progress: number) => void) => api.uploadFile(`/users/avatar`, file, id, onProgress),
  // Enterprises
  getAllEnterprises: () => api.get('/enterprise'),
  getEnterpriseById: (id: string) => api.get(`/enterprise/${id}`),
  createEnterprise: (enterpriseData: any) => api.post('/enterprise', enterpriseData),
  updateEnterprise: (id: string, enterpriseData: any) => api.put(`/enterprise/${id}`, enterpriseData),

  // Categories
  getAllCategories: () => api.get('/category'),
  createCategory: (categoryData: CreateCategory) => api.post('/category', categoryData),

  // Locations
  getAllLocations: () => api.get('/location'),
  createLocation: (locationData: CreateLocation) => api.post('/location', locationData),

  // Skills
  getAllSkills: () => api.get('/skills'),
  getSkillsByUserId: (id: string) => api.get(`/skills/user/${id}`),
  createSkill: (skillData: CreateSkill) => api.post('/skills', skillData),
  deleteSkill: (id: string) => api.delete(`/skills/${id}`),
  updateSkill: (id: string, skillData: CreateSkill) => api.put(`/skills/${id}`, skillData),
  // Languages
  getAllLanguages: () => api.get('/languages'),
  createLanguage: (languageData: any) => api.post('/languages', languageData),

  // Experience
  getAllExperiences: () => api.get('/experience'),
  createExperience: (experienceData: any) => api.post('/experience', experienceData),
  updateExperience: (id: string, experienceData: any) => api.put(`/experience/${id}`, experienceData),
  deleteExperience: (id: string) => api.delete(`/experience/${id}`),
  getExperienceByUserId: (userId: string) => api.get<Experience[]>(`/experience/user/${userId}`),
  // Students
  getAllStudents: () => api.get('/student'),
  getStudentById: (id: string) => api.get(`/student/${id}`),
  createStudent: (studentData: any) => api.post('/student', studentData),
  updateStudent: (id: string, studentData: any) => api.put(`/student/${id}`, studentData),

  // Interviews
  getAllInterviews: () => api.get('/interview'),
  createInterview: (interviewData: any) => api.post('/interview', interviewData),
  updateInterview: (id: string, interviewData: any) => api.put(`/interview/${id}`, interviewData),

  // Follow Up
  getAllFollowUps: () => api.get('/followUp'),
  createFollowUp: (followUpData: any) => api.post('/followUp', followUpData),
  updateFollowUp: (id: string, followUpData: any) => api.put(`/followUp/${id}`, followUpData),

  getEducations: () => api.get('/education'),
  getEducationById: (id: string) => api.get(`/education/${id}`),
  getEducationByUserId: (userId: string) => api.get(`/education/user/${userId}`),
  createEducation: (educationData: any) => api.post('/education', educationData),
  updateEducation: (id: string, educationData: any) => api.put(`/education/${id}`, educationData),
  deleteEducation: (id: string) => api.delete(`/education/${id}`),


};

// Exportar la instancia principal para uso directo
export default api;

// Exportar también el cliente de axios para casos especiales
export { apiClient };