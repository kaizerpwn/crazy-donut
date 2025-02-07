import { useState } from "react";
import { Topic } from "../types/Topic";
import { TopicFormData } from "../types/TopicFormData";
import { TopicsAPI } from "../api/Topics/Topics";
import { SlackAPI } from "../api/Slack/Slack";
import { SlackSettings } from "../types/SlackSettings";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useTopicManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: TopicFormData): Promise<void> => {
    try {
      if (editingTopic) {
        await TopicsAPI.updateTopic(editingTopic.id, formData);
        toast.success("Topic updated successfully");
      } else {
        await TopicsAPI.addTopic(formData);
        toast.success("Topic added successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      setIsModalOpen(false);
      setEditingTopic(null);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${editingTopic ? "update" : "add"} topic`);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await TopicsAPI.deleteTopic(id);
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      toast.success("Topic deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete topic");
    }
  };

  const handleSchedule = async (
    topic: Topic,
    slackSettings: SlackSettings
  ): Promise<void> => {
    if (!slackSettings.channel_id) {
      toast.error("Please set a Slack channel ID first");
      return;
    }

    try {
      await TopicsAPI.sendTopic(topic.id);
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      toast.success("Topic sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to schedule topic");
    }
  };

  const handleSaveSlackSettings = async (
    settings: SlackSettings
  ): Promise<void> => {
    try {
      await SlackAPI.updateSlackSettings(settings);
      setIsSettingsModalOpen(false);
      toast.success("Slack settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["slackSettings"] });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Slack settings");
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    editingTopic,
    setEditingTopic,
    currentPage,
    setCurrentPage,
    handleSubmit,
    handleDelete,
    handleSchedule,
    handleSaveSlackSettings,
  };
};
