import { exerciseApi } from './api'
import type { Exercise, CreateExerciseRequest, ApiResponse } from '../types'

export const exerciseService = {
  async getExercises(params?: { q?: string; page?: number; limit?: number }): Promise<{
    exercises: Exercise[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }> {
    const searchParams = new URLSearchParams()
    if (params?.q) searchParams.append('q', params.q)
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const response = await exerciseApi.get<ApiResponse<{
      exercises: Exercise[]
      pagination: any
    }>>(`/api/exercises?${searchParams}`)
    return response.data.data
  },

  async getExercise(id: number): Promise<Exercise> {
    const response = await exerciseApi.get<ApiResponse<Exercise>>(`/api/exercises/${id}`)
    return response.data.data
  },

  async createExercise(exercise: CreateExerciseRequest): Promise<Exercise> {
    const response = await exerciseApi.post<ApiResponse<Exercise>>('/api/exercises', exercise)
    return response.data.data
  },

  async updateExercise(id: number, exercise: Partial<CreateExerciseRequest>): Promise<Exercise> {
    const response = await exerciseApi.put<ApiResponse<Exercise>>(`/api/exercises/${id}`, exercise)
    return response.data.data
  },

  async deleteExercise(id: number): Promise<void> {
    await exerciseApi.delete(`/api/exercises/${id}`)
  },

  async uploadVideo(id: number, videoFile: File): Promise<Exercise> {
    const formData = new FormData()
    formData.append('video', videoFile)
    
    const response = await exerciseApi.post<ApiResponse<Exercise>>(
      `/api/exercises/${id}/video`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data.data
  },

  async deleteVideo(id: number): Promise<void> {
    await exerciseApi.delete(`/api/exercises/${id}/video`)
  },

  getVideoUrl(id: number): string {
    return `${import.meta.env.VITE_EXERCISE_SERVICE_URL}/api/exercises/${id}/video`
  }
}