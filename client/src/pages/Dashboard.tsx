import { useState } from "react";
import { Topic } from "../types/Topic";
import { TopicFormData } from "../types/TopicFormData";
import { TopicsTable } from "../components/TopicsTable";
import { TopicModal } from "../components/TopicModal";
import { Pagination } from "../components/Pagination";
import { SlackSettingsModal } from "../components/SlackSettingsModal";
import { Settings, Send, PlusCircle, LogOut } from "lucide-react";
import useTopics from "../hooks/useTopics";
import { TopicsAPI } from "../api/Topics/Topics";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

const Dashboard: React.FC = () => {
  const { topics } = useTopics();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [slackChannel, setSlackChannel] = useState<string>("");
  const topicsPerPage = 5;

  const handleEdit = (topic: Topic): void => {
    setEditingTopic(topic);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await TopicsAPI.deleteTopic(id);
      queryClient.invalidateQueries(["topics"] as InvalidateQueryFilters);
    } catch (error) {
      console.error("Failed to delete topic:", error);
      alert("Failed to delete topic");
    }
  };

  const handleSubmit = async (formData: TopicFormData): Promise<void> => {
    if (editingTopic) {
      try {
        await TopicsAPI.updateTopic(editingTopic.id, formData);
        queryClient.invalidateQueries(["topics"] as InvalidateQueryFilters);
      } catch (error) {
        console.error("Failed to update topic:", error);
        alert("Failed to update topic");
      }
    } else {
      try {
        await TopicsAPI.addTopic(formData);
        queryClient.invalidateQueries(["topics"] as InvalidateQueryFilters);
      } catch (error) {
        console.error("Failed to add topic:", error);
        alert("Failed to add topic");
      }
    }
    setIsModalOpen(false);
    setEditingTopic(null);
  };

  const handleSchedule = async (topic: Topic): Promise<void> => {
    if (!slackChannel) {
      alert("Please set a Slack channel ID first");
      return;
    }

    try {
      // TODO: Send the topic to the Slack channel
    } catch (error) {
      console.error("Failed to schedule topic:", error);
      alert("Failed to schedule topic");
    }
  };

  const handleSendLatest = async (): Promise<void> => {
    if (!slackChannel) {
      alert("Please set a Slack channel ID first");
      return;
    }

    const unsent = topics.filter((topic) => !topic.sent_at);
    if (unsent.length === 0) {
      alert("No unsent topics available");
      return;
    }

    const latest = unsent[unsent.length - 1];
    await handleSchedule(latest);
  };

  const totalPages = Math.ceil(topics.length / topicsPerPage);
  const currentTopics = topics.slice(
    (currentPage - 1) * topicsPerPage,
    currentPage * topicsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50">
      <nav className="bg-white border-b border-gray-200 bg-opacity-70 backdrop-filter backdrop-blur-sm border-opacity-30">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Crazy Donut</h1>
            </div>
            <button
              onClick={() => {}}
              className="inline-flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors duration-150 rounded-lg hover:bg-gray-100"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-6 mb-8 bg-white border border-white shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl border-opacity-40">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Watercooler Topics
              </h2>
              <div className="flex items-center mt-1 space-x-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    slackChannel ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <p className="text-sm text-gray-600">
                  {slackChannel
                    ? `Connected to #${slackChannel}`
                    : "No Slack channel connected"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsSettingsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors duration-150 bg-white border border-gray-200 rounded-lg shadow-sm bg-opacity-80 hover:bg-opacity-100"
              >
                <Settings size={18} />
                <span>Slack Settings</span>
              </button>
              <button
                onClick={handleSendLatest}
                className="inline-flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-150 bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600"
              >
                <Send size={18} />
                <span>Send Latest</span>
              </button>
              <button
                onClick={() => {
                  setEditingTopic(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-150 bg-pink-500 rounded-lg shadow-sm hover:bg-pink-600"
              >
                <PlusCircle size={18} />
                <span>New Topic</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-white shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl border-opacity-40">
            <TopicsTable
              topics={currentTopics}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSchedule={handleSchedule}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <TopicModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTopic(null);
        }}
        onSubmit={handleSubmit}
        topic={editingTopic}
      />

      <SlackSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={setSlackChannel}
        currentChannelId={slackChannel}
      />
    </div>
  );
};

export default Dashboard;
