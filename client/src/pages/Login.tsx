import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, MessageCircle, Sparkles } from "lucide-react";
import { AdminAPI, LoginRequest } from "../api/Admin/Admin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const loginRequest: LoginRequest = { username, password };

    try {
      await AdminAPI.login(loginRequest);
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Failed to login:", error);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-pink-100 via-white to-pink-50">
      <div className="absolute bg-pink-200 rounded-full top-20 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30"></div>
      <div className="absolute bg-pink-200 rounded-full bottom-20 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30"></div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <img src="/logo-transparent.png" className="w-32 h-32" alt="Logo" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Crazy Donut</h1>
          <p className="mt-1 text-sm text-gray-600">
            Your Watercooler Topic Generator for Slack
          </p>
        </div>

        <div className="overflow-hidden bg-white border border-white rounded-lg shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-sm border-opacity-40">
          <div className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-center text-gray-700">
              Welcome back!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-sm text-center text-red-500">{error}</div>
              )}
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 transition-colors duration-200 bg-white border border-gray-200 rounded-lg outline-none bg-opacity-70 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 transition-colors duration-200 bg-white border border-gray-200 rounded-lg outline-none bg-opacity-70 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white transition-colors duration-200 bg-pink-500 rounded-lg shadow-md hover:bg-pink-600"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 text-center bg-white border border-white rounded-lg shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-sm border-opacity-40">
            <MessageCircle className="w-5 h-5 mx-auto mb-1 text-pink-500" />
            <p className="text-xs text-gray-600">Daily Topics</p>
          </div>
          <div className="p-3 text-center bg-white border border-white rounded-lg shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-sm border-opacity-40">
            <Sparkles className="w-5 h-5 mx-auto mb-1 text-pink-500" />
            <p className="text-xs text-gray-600">Team Building</p>
          </div>
          <div className="p-3 text-center bg-white border border-white rounded-lg shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-sm border-opacity-40">
            <Coffee className="w-5 h-5 mx-auto mb-1 text-pink-500" />
            <p className="text-xs text-gray-600">Easy Setup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
