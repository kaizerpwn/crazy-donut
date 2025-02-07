interface HeaderInfoProps {
  slackSettings: {
    channel_id: string;
  };
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({ slackSettings }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900">Watercooler Topics</h2>
    <div className="flex items-center mt-1 space-x-2">
      <div
        className={`h-2 w-2 rounded-full ${
          slackSettings.channel_id ? "bg-green-500" : "bg-gray-300"
        }`}
      />
      <p className="text-sm text-gray-600">
        {slackSettings.channel_id
          ? `Connected to #${slackSettings.channel_id}`
          : "No Slack channel connected"}
      </p>
    </div>
  </div>
);
