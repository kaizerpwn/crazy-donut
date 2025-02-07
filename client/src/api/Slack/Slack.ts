import { SlackSettings } from "../../types/SlackSettings";
import http from "../http";

export const SlackAPI = {
  getSlackSettings: async (): Promise<SlackSettings> => {
    const response = await http.get<SlackSettings>("/slack-settings/");
    return response.data;
  },

  updateSlackSettings: async (settings: SlackSettings): Promise<void> => {
    await http.put("/slack-settings/", settings);
  },
};
