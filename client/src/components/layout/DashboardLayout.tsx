import { NavBar } from "../NavBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onLogout,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50">
    <NavBar onLogout={onLogout} />
    <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);
