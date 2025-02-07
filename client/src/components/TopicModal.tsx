import React, { useState, useEffect } from "react";
import { Topic } from "../types/Topic";
import { TopicFormData } from "../types/TopicFormData";
import {
  X,
  Image,
  MessageCircle,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

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
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (topic) {
      setFormData({
        topic: topic.topic,
        image_url: topic.image_url || "",
      });
    } else {
      setFormData({
        topic: "",
        image_url: "",
      });
    }
    setImageError(false);
  }, [topic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-lg animate-modal-appear">
        <div className="relative bg-white border border-white shadow-xl bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl border-opacity-40">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 border-opacity-50">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-pink-100 rounded-lg">
                <MessageCircle className="w-5 h-5 text-pink-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {topic ? "Edit Topic" : "Create New Topic"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 transition-colors rounded-lg cursor-pointer hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                Topic Question
              </label>
              <textarea
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                className="w-full px-4 py-3 bg-white bg-opacity-70 border border-gray-200 rounded-lg outline-none transition-all duration-200 
                  focus:border-pink-500 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-20 min-h-[100px] resize-none"
                placeholder="Enter an engaging question..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Image className="w-4 h-4 mr-1.5" />
                Image URL (optional)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.image_url || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, image_url: e.target.value });
                    setImageError(false);
                  }}
                  className="w-full px-4 py-2.5 bg-white bg-opacity-70 border border-gray-200 rounded-lg outline-none transition-all duration-200 
                    focus:border-pink-500 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-20"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image_url && (
                  <a
                    href={formData.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {formData.image_url && (
                <div className="mt-3">
                  <div className="relative overflow-hidden border border-gray-200 rounded-lg bg-gray-50">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="object-cover w-full h-48"
                      onError={() => setImageError(true)}
                      style={{ display: imageError ? "none" : "block" }}
                    />
                    {imageError && (
                      <div className="flex items-center justify-center h-48 text-gray-400 bg-gray-50">
                        <div className="flex flex-col items-center">
                          <AlertCircle className="w-6 h-6 mb-2" />
                          <span className="text-sm">Invalid image URL</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end pt-2 space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2.5 text-white bg-pink-500 hover:bg-pink-600 rounded-lg transition-all duration-200 cursor-pointer 
                  focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 flex items-center
                  ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-2 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {topic ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{topic ? "Update Topic" : "Create Topic"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
