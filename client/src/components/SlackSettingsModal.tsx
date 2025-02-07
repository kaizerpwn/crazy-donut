import { useState, useEffect } from "react";
import { SlackSettings } from "../types/SlackSettings";

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

  useEffect(() => {
    setBotToken(currentSettings.bot_token);
    setSigningSecret(currentSettings.signing_secret);
    setChannelId(currentSettings.channel_id);
  }, [currentSettings]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-6 bg-white border border-white rounded-lg shadow-xl bg-opacity-60 backdrop-filter backdrop-blur-sm border-opacity-40">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Slack Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Bot Token
            </label>
            <input
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none bg-opacity-70 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              placeholder="Enter Slack bot token..."
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Signing Secret
            </label>
            <input
              type="text"
              value={signingSecret}
              onChange={(e) => setSigningSecret(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none bg-opacity-70 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              placeholder="Enter Slack signing secret..."
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Channel ID
            </label>
            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none bg-opacity-70 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              placeholder="Enter Slack channel ID..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave({
                  bot_token: botToken,
                  signing_secret: signingSecret,
                  channel_id: channelId,
                });
                onClose();
              }}
              className="px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
