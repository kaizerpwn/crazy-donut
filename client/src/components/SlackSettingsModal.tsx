import { useState } from "react";

interface SlackSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (channelId: string) => void;
  currentChannelId: string;
}

export const SlackSettingsModal: React.FC<SlackSettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentChannelId,
}) => {
  const [channelId, setChannelId] = useState(currentChannelId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm p-6 rounded-lg shadow-xl border border-white border-opacity-40 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Slack Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel ID
            </label>
            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
              placeholder="Enter Slack channel ID..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(channelId);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
