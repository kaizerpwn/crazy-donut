import { useState, useEffect } from "react";
import { SlackSettings } from "../types/SlackSettings";
import { X, Key, Hash, Bot, Eye, EyeOff } from "lucide-react";

interface SlackSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: SlackSettings) => void;
  currentSettings: SlackSettings;
}

export const SlackSettingsModal: React.FC<SlackSettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentSettings,
}) => {
  const [botToken, setBotToken] = useState(currentSettings.bot_token);
  const [signingSecret, setSigningSecret] = useState(
    currentSettings.signing_secret
  );
  const [channelId, setChannelId] = useState(currentSettings.channel_id);
  const [showSecret, setShowSecret] = useState(false);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    setBotToken(currentSettings.bot_token);
    setSigningSecret(currentSettings.signing_secret);
    setChannelId(currentSettings.channel_id);
  }, [currentSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      bot_token: botToken,
      signing_secret: signingSecret,
      channel_id: channelId,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md animate-modal-appear">
        <div className="relative bg-white border border-white shadow-xl bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl border-opacity-40">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 border-opacity-50">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Bot className="w-5 h-5 text-pink-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Slack Settings
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 transition-colors rounded-lg cursor-pointer hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="flex items-center mb-1.5 text-sm font-medium text-gray-700">
                <Key className="w-4 h-4 mr-1.5" />
                Bot Token
              </label>
              <div className="relative">
                <input
                  type={showToken ? "text" : "password"}
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 bg-white bg-opacity-70 border border-gray-200 rounded-lg outline-none transition-all duration-200 
                    focus:border-pink-500 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-20"
                  placeholder="xoxb-your-bot-token..."
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-3 top-1/2 hover:text-gray-600"
                >
                  {showToken ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center mb-1.5 text-sm font-medium text-gray-700">
                <Key className="w-4 h-4 mr-1.5" />
                Signing Secret
              </label>
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  value={signingSecret}
                  onChange={(e) => setSigningSecret(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 bg-white bg-opacity-70 border border-gray-200 rounded-lg outline-none transition-all duration-200 
                    focus:border-pink-500 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-20"
                  placeholder="Enter signing secret..."
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-3 top-1/2 hover:text-gray-600"
                >
                  {showSecret ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center mb-1.5 text-sm font-medium text-gray-700">
                <Hash className="w-4 h-4 mr-1.5" />
                Channel ID
              </label>
              <input
                type="text"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                className="w-full px-4 py-2.5 bg-white bg-opacity-70 border border-gray-200 rounded-lg outline-none transition-all duration-200 
                  focus:border-pink-500 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-20"
                placeholder="C0123ABCDEF"
              />
            </div>

            <div className="flex items-center justify-end pt-2 space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 transition-colors duration-200 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white transition-colors duration-200 bg-pink-500 rounded-lg cursor-pointer hover:bg-pink-600 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
