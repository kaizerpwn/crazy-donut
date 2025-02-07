import { QueryClient } from "@tanstack/react-query";
import { TopicsAPI } from "../api/Topics/Topics";
import { TopicFormData } from "../types/TopicFormData";
import { Topic } from "../types/Topic";
import toast from "react-hot-toast";
import { SlackSettings } from "../types/SlackSettings";

export const useTopicOperations = (queryClient: QueryClient) => {
  const handleSubmit = async (
    formData: TopicFormData,
    editingTopic: Topic | null
  ): Promise<void> => {
    try {
      if (editingTopic) {
        await TopicsAPI.updateTopic(editingTopic.id, formData);
      } else {
        await TopicsAPI.addTopic(formData);
      }
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      toast.success(`Topic ${editingTopic ? "updated" : "added"} successfully`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${editingTopic ? "update" : "add"} topic`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TopicsAPI.deleteTopic(id);
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      toast.success("Topic deleted successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete topic");
      return false;
    }
  };

  const handleSchedule = async (topic: Topic, slackSettings: SlackSettings) => {
    if (!slackSettings.channel_id) {
      toast.error("Please set a Slack channel ID first");
      return false;
    }

    try {
      await TopicsAPI.sendTopic(topic.id);
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      toast.success("Topic sent successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to schedule topic");
      return false;
    }
  };

  return { handleSubmit, handleDelete, handleSchedule };
};
