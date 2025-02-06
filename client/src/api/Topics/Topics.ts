import http from "../http";
import { Topic } from "../../types/Topic";
import { TopicFormData } from "../../types/TopicFormData";

export const TopicsAPI = {
  getAllTopics: async (): Promise<Topic[]> => {
    try {
      const response = await http.get("/topics");
      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },

  getTopicById: async (topicId: number): Promise<Topic> => {
    try {
      const response = await http.get(`/topics/${topicId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching topic with id ${topicId}:`, error);
      throw error;
    }
  },

  addTopic: async (topicData: TopicFormData): Promise<void> => {
    try {
      await http.post("/topics", topicData);
    } catch (error) {
      console.error("Error adding topic:", error);
      throw error;
    }
  },

  updateTopic: async (
    topicId: number,
    topicData: TopicFormData
  ): Promise<void> => {
    try {
      await http.put(`/topics/${topicId}`, topicData);
    } catch (error) {
      console.error(`Error updating topic with id ${topicId}:`, error);
      throw error;
    }
  },

  deleteTopic: async (topicId: number): Promise<void> => {
    try {
      await http.delete(`/topics/${topicId}`);
    } catch (error) {
      console.error(`Error deleting topic with id ${topicId}:`, error);
      throw error;
    }
  },
};
