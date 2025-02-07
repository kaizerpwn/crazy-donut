import { LogOut } from "lucide-react";

interface NavBarProps {
  onLogout: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onLogout }) => (
  <nav className="bg-white border-b border-gray-200 bg-opacity-70 backdrop-filter backdrop-blur-sm border-opacity-30">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center flex-shrink-0">
          <div className="flex items-center justify-center gap-1">
            <img src="/logo-transparent.png" alt="Logo" className="h-14 w-14" />
            <h1 className="text-xl font-bold text-gray-900">Crazy Donut</h1>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="inline-flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors duration-150 rounded-lg hover:bg-gray-100"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </nav>
);
