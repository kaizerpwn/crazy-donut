import { useState } from "react";
import { Topic } from "../types/Topic";
import { TopicFormData } from "../types/TopicFormData";
import { TopicsTable } from "../components/TopicsTable";
import { TopicModal } from "../components/TopicModal";
import { Pagination } from "../components/Pagination";
import { SlackSettingsModal } from "../components/SlackSettingsModal";
import { Settings, Send, PlusCircle, LogOut } from "lucide-react";

const Dashboard: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      topic: "What's the weirdest food combo you secretly love?",
      image_url: null,
      sent_at: null,
    },
    {
      id: 2,
      topic: "If you could switch jobs with anyone for a day, who would it be?",
      image_url: null,
      sent_at: null,
    },
  ]);
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

  const handleDelete = (id: number): void => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const handleSubmit = (formData: TopicFormData): void => {
    if (editingTopic) {
      setTopics(
        topics.map((topic) =>
          topic.id === editingTopic.id ? { ...topic, ...formData } : topic
        )
      );
    } else {
      setTopics([
        ...topics,
        {
          ...formData,
          id: Date.now(),
          sent_at: null,
        },
      ]);
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
      const updatedTopic = { ...topic, sent_at: new Date().toISOString() };
      setTopics(topics.map((t) => (t.id === topic.id ? updatedTopic : t)));
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
      <nav className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm border-b border-gray-200 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Crazy Donut</h1>
            </div>
            <button
              onClick={() => {}}
              className="inline-flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-150 space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl p-6 mb-8 border border-white border-opacity-40 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Watercooler Topics
              </h2>
              <div className="mt-1 flex items-center space-x-2">
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
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100 transition-colors duration-150 shadow-sm border border-gray-200 space-x-2"
              >
                <Settings size={18} />
                <span>Slack Settings</span>
              </button>
              <button
                onClick={handleSendLatest}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-150 shadow-sm space-x-2"
              >
                <Send size={18} />
                <span>Send Latest</span>
              </button>
              <button
                onClick={() => {
                  setEditingTopic(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-150 shadow-sm space-x-2"
              >
                <PlusCircle size={18} />
                <span>New Topic</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl border border-white border-opacity-40 shadow-sm">
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
