import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  Anchor 
} from 'lucide-react'

export default function Sidebar({ currentView, setCurrentView }) {
  const location = useLocation()

  const navigation = [
    {
      name: 'Tableau de bord',
      view: 'dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Gestion utilisateurs', 
      view: 'users',
      icon: Users,
    },
    {
      name: 'Signalements',
      view: 'reports',
      icon: AlertTriangle,
    },
  ]

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Anchor className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin</h1>
            <p className="text-sm text-gray-500">Salon Maritime</p>
          </div>
        </div>
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = currentView === item.view
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => setCurrentView(item.view)}
                  className={cn(
                    'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-left',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

