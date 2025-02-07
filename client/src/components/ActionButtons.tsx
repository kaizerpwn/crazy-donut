import { Settings, Send, PlusCircle } from "lucide-react";

interface ActionButtonsProps {
  onSettingsClick: () => void;
  onSendLatest: () => void;
  onNewTopic: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSettingsClick,
  onSendLatest,
  onNewTopic,
}) => (
  <div className="flex flex-wrap gap-3">
    <button
      onClick={onSettingsClick}
      className="inline-flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors duration-150 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer bg-opacity-80 hover:bg-opacity-100"
    >
      <Settings size={18} />
      <span>Slack Settings</span>
    </button>
    <button
      onClick={onSendLatest}
      className="inline-flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-150 bg-blue-500 rounded-lg shadow-sm cursor-pointer hover:bg-blue-600"
    >
      <Send size={18} />
      <span>Send Latest</span>
    </button>
    <button
      onClick={onNewTopic}
      className="inline-flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-150 bg-pink-500 rounded-lg shadow-sm cursor-pointer hover:bg-pink-600"
    >
      <PlusCircle size={18} />
      <span>New Topic</span>
    </button>
  </div>
);
