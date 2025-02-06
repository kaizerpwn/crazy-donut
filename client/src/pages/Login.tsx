import { Coffee, MessageCircle, Sparkles } from "lucide-react";

const LoginPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white border-opacity-20">
              <Coffee className="h-8 w-8 text-pink-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Crazy Donut</h1>
          <p className="text-sm text-gray-600 mt-1">
            Your Watercooler Topic Generator for Slack
          </p>
        </div>

        <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm shadow-lg border border-white border-opacity-40 rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg text-center text-gray-700 font-semibold mb-6">
              Welcome back!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg shadow-md transition-colors duration-200"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-lg p-3 text-center shadow-sm border border-white border-opacity-40">
            <MessageCircle className="h-5 w-5 text-pink-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Daily Topics</p>
          </div>
          <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-lg p-3 text-center shadow-sm border border-white border-opacity-40">
            <Sparkles className="h-5 w-5 text-pink-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Team Building</p>
          </div>
          <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-lg p-3 text-center shadow-sm border border-white border-opacity-40">
            <Coffee className="h-5 w-5 text-pink-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Easy Setup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
