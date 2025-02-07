import { SlackSettings } from "../types/SlackSettings";
import { ActionButtons } from "./ActionButtons";
import { HeaderInfo } from "./HeaderInfo";

interface TopicHeaderProps {
  slackSettings: SlackSettings;
  onSettingsClick: () => void;
  onSendLatest: () => void;
  onNewTopic: () => void;
}

export const TopicHeader: React.FC<TopicHeaderProps> = ({
  slackSettings,
  onSettingsClick,
  onSendLatest,
  onNewTopic,
}) => (
  <div className="p-6 mb-8 bg-white border border-white shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl border-opacity-40">
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <HeaderInfo slackSettings={slackSettings} />
      <ActionButtons
        onSettingsClick={onSettingsClick}
        onSendLatest={onSendLatest}
        onNewTopic={onNewTopic}
      />
    </div>
  </div>
);
