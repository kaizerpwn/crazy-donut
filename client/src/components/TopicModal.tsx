import React, { useState, useEffect } from "react";
import { Topic } from "../types/Topic";
import { TopicFormData } from "../types/TopicFormData";

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TopicFormData) => void;
  topic?: Topic | null;
}

export const TopicModal: React.FC<TopicModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  topic = null,
}) => {
  const [formData, setFormData] = useState<TopicFormData>({
    topic: "",
    image_url: "",
  });

  useEffect(() => {
    if (topic) {
      setFormData({
        topic: topic.topic,
        image_url: topic.image_url,
      });
    } else {
      setFormData({
        topic: "",
        image_url: "",
      });
    }
  }, [topic]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm p-6 rounded-lg shadow-xl border border-white border-opacity-40 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {topic ? "Edit Topic" : "Create New Topic"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                placeholder="Enter your question..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image_url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                placeholder="Enter image URL..."
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200"
            >
              {topic ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
