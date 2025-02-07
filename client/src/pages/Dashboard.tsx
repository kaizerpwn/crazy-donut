import React from "react";
import { useNavigate } from "react-router-dom";
import { useTopicManagement } from "../hooks/useTopicManagement";
import { TopicsTable } from "../components/TopicsTable";
import { TopicModal } from "../components/TopicModal";
import { SlackSettingsModal } from "../components/SlackSettingsModal";
import { Pagination } from "../components/Pagination";
import { AdminAPI } from "../api/Admin/Admin";
import { Settings, Send, PlusCircle, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Topic } from "../types/Topic";
import useSlackSettings from "../hooks/useSlackSettings";
import useTopics from "../hooks/useTopics";

const TOPICS_PER_PAGE = 5;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { topics } = useTopics();
  const { slackSettings, refetch: refetchSlackSettings } = useSlackSettings();
  const {
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
  } = useTopicManagement();

  const handleLogout = async (): Promise<void> => {
    try {
      await AdminAPI.logout();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  const handleSendLatest = async (): Promise<void> => {
    const unsent = topics.filter((topic: Topic) => !topic.sent_at);
    if (unsent.length === 0) {
      toast.error("No unsent topics available");
      return;
    }
    await handleSchedule(unsent[unsent.length - 1], slackSettings);
  };

  const currentTopics = topics.slice(
    (currentPage - 1) * TOPICS_PER_PAGE,
    currentPage * TOPICS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50">
      <nav className="bg-white border-b border-gray-200 bg-opacity-70 backdrop-filter backdrop-blur-sm border-opacity-30">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <div className="flex items-center justify-center gap-1">
                <img
                  src="/logo-transparent.png"
                  alt="Logo"
                  className="h-14 w-14"
                />
                <h1 className="text-xl font-bold text-gray-900">Crazy Donut</h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors duration-150 rounded-lg cursor-pointer hover:bg-gray-100"
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
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsSettingsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors duration-150 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer bg-opacity-80 hover:bg-opacity-100"
              >
                <Settings size={18} />
                <span>Slack Settings</span>
              </button>
              <button
                onClick={handleSendLatest}
                className="inline-flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-150 bg-blue-500 rounded-lg shadow-sm cursor-pointer hover:bg-blue-600"
              >
                <Send size={18} />
                <span>Send Latest</span>
              </button>
              <button
                onClick={() => {
                  setEditingTopic(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-150 bg-pink-500 rounded-lg shadow-sm cursor-pointer hover:bg-pink-600"
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
              onEdit={(topic) => {
                setEditingTopic(topic);
                setIsModalOpen(true);
              }}
              onDelete={handleDelete}
              onSchedule={(topic) => handleSchedule(topic, slackSettings)}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(topics.length / TOPICS_PER_PAGE)}
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
        giphyApiKey={slackSettings.giphy_api_key}
      />

      <SlackSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={(settings) => {
          handleSaveSlackSettings(settings);
          refetchSlackSettings();
        }}
        currentSettings={slackSettings}
      />
    </div>
  );
};

export default Dashboard;
