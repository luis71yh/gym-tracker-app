import React from 'react'

const DashboardPage: React.FC = () => {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mi Dashboard
        </h1>
        <p className="text-gray-600">
          Gestiona tus rutinas y consulta tu progreso
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Rutinas Creadas</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
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