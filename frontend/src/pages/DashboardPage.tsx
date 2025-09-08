import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { routineService } from '../services/routineService'
import { workoutService } from '../services/workoutService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Plus, Calendar, TrendingUp, Clock } from 'lucide-react'

const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<any>(null)
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([])
  const [routines, setRoutines] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      const [workoutStats, recentWorkoutsData, routinesData] = await Promise.all([
        workoutService.getStats(30),
        workoutService.getRecentWorkouts(),
        routineService.getRoutines({ limit: 5 })
      ])
      
      setStats(workoutStats)
      setRecentWorkouts(recentWorkoutsData)
      setRoutines(routinesData.routines)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar el dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadDashboardData} />
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Hola, {user?.username}! 👋
        </h1>
        <p className="text-gray-600">
          Aquí tienes un resumen de tu actividad reciente
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Entrenamientos</h3>
              <p className="text-2xl font-bold text-primary-600">{stats?.totalWorkouts || 0}</p>
            </div>
            <Calendar className="h-8 w-8 text-primary-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Últimos 30 días</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Series Totales</h3>
              <p className="text-2xl font-bold text-green-600">{stats?.totalSets || 0}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Últimos 30 días</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Peso Total</h3>
              <p className="text-2xl font-bold text-blue-600">{stats?.totalWeightLifted || 0} kg</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Últimos 30 días</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Tiempo Promedio</h3>
              <p className="text-2xl font-bold text-purple-600">{stats?.avgDurationMinutes || 0}m</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Por entrenamiento</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Rutinas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Mis Rutinas</h2>
            <Link to="/routines/new" className="btn-primary text-sm flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              Nueva Rutina
            </Link>
          </div>
          
          {routines.length > 0 ? (
            <div className="space-y-3">
              {routines.map((routine) => (
                <div key={routine.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{routine.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{routine.description}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {routine.exercises?.length || 0} ejercicios
                      </p>
                    </div>
                    <Link 
                      to={`/routines/${routine.id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <Link to="/routines" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Ver todas las rutinas →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🏋️‍♂️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes rutinas creadas
              </h3>
              <p className="text-gray-500 mb-4">
                Crea tu primera rutina para comenzar a entrenar
              </p>
              <Link to="/routines/new" className="btn-primary">
                Crear Mi Primera Rutina
              </Link>
            </div>
          )}
        </div>
        
        {/* Entrenamientos Recientes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Entrenamientos Recientes</h2>
            <Link to="/workouts" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Ver todos
            </Link>
          </div>
          
          {recentWorkouts.length > 0 ? (
            <div className="space-y-3">
              {recentWorkouts.map((workout) => (
                <div key={workout.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{workout.routineName}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(workout.startedAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        <span>{workout.totalSets} series</span>
                        <span>{workout.exercises.length} ejercicios</span>
                        {workout.duration && (
                          <span>{Math.round(workout.duration / 60)}m</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {workout.isCompleted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          En progreso
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay entrenamientos recientes
              </h3>
              <p className="text-gray-500 mb-4">
                Inicia tu primer entrenamiento
              </p>
              <Link to="/routines" className="btn-primary">
                Elegir Rutina
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
          <p className="text-sm text-gray-500">Total de rutinas</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Entrenamientos</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
          <p className="text-sm text-gray-500">Este mes</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Tiempo Total</h3>
          <p className="text-3xl font-bold text-blue-600">0h</p>
          <p className="text-sm text-gray-500">Tiempo entrenado</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Mis Rutinas</h2>
          <button className="btn-primary">
            + Nueva Rutina
          </button>
        </div>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏋️‍♂️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tienes rutinas creadas
          </h3>
          <p className="text-gray-500 mb-4">
            Crea tu primera rutina para comenzar a entrenar
          </p>
          <button className="btn-primary">
            Crear Mi Primera Rutina
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage