import React, { useState, useEffect, memo } from "react";
import { X, Image, MessageCircle, Loader, ImageIcon } from "lucide-react";
import { GiphySelectModal } from "./GiphySelectModal";
import { TopicFormData } from "../types/TopicFormData";
import { Topic } from "../types/Topic";

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TopicFormData) => Promise<void>;
  topic?: Topic | null;
  giphyApiKey: string;
}

export const TopicModal = memo(
  ({
    isOpen,
    onClose,
    onSubmit,
    topic = null,
    giphyApiKey,
  }: TopicModalProps) => {
    const [formData, setFormData] = useState<TopicFormData>({
      topic: "",
      image_url: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGiphyModalOpen, setIsGiphyModalOpen] = useState(false);

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
    }, [topic]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        onClose();
      } catch (error) {
        console.error("Error submitting topic:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="w-full max-w-lg animate-modal-appear">
          <div className="relative bg-white border border-white shadow-xl bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl border-opacity-40">
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
                    setFormData((prev) => ({ ...prev, topic: e.target.value }))
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
                  Image URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.image_url || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        image_url: e.target.value,
                      }))
                    }
                    placeholder="Enter image URL or choose a GIF..."
                    className="w-full pl-4 pr-10 py-2.5 bg-white bg-opacity-70 border border-gray-200 rounded-lg outline-none transition-all duration-200 
                    focus:border-pink-500 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-20"
                  />
                  <button
                    type="button"
                    onClick={() => setIsGiphyModalOpen(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-pink-500 rounded-lg transition-colors"
                    title="Search GIFs"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {formData.image_url && (
                <div className="relative overflow-hidden border border-gray-200 rounded-lg bg-gray-50">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="object-cover w-full h-40"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image_url: "" }))
                    }
                    className="absolute p-1 bg-white rounded-full shadow-sm cursor-pointer top-2 right-2 hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}

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
                      <Loader className="w-4 h-4 mr-2 -ml-1 animate-spin" />
                      {topic ? "Updating..." : "Creating..."}
                    </>
                  ) : topic ? (
                    "Update Topic"
                  ) : (
                    "Create Topic"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <GiphySelectModal
          isOpen={isGiphyModalOpen}
          onClose={() => setIsGiphyModalOpen(false)}
          onSelect={(url) =>
            setFormData((prev) => ({ ...prev, image_url: url }))
          }
          giphyApiKey={giphyApiKey}
        />
      </div>
    );
  }
);
