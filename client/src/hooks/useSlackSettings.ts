import { useQuery } from "@tanstack/react-query";
import { SlackAPI } from "../api/Slack/Slack";
import { SlackSettings } from "../types/SlackSettings";

interface UseSlackSettingsResponse {
  slackSettings: SlackSettings;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

const useSlackSettings = (): UseSlackSettingsResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["slackSettings"],
    queryFn: async () => {
      const response = await SlackAPI.getSlackSettings();
      return response || [];
    },
  });

  return {
    slackSettings: data || {
      bot_token: "",
      signing_secret: "",
      channel_id: "",
    },
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useSlackSettings;
