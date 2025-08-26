import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary-600">
                💪 Fitness App
              </h1>
            </div>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Inicio
              </a>
              <a href="/login" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Iniciar Sesión
              </a>
              <a href="/register" className="btn-primary text-sm">
                Registrarse
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Fitness App. Gestión de rutinas de entrenamiento.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout