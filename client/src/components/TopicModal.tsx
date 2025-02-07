import React, { useState, useEffect, memo } from "react";
import { X, Image, MessageCircle, Loader } from "lucide-react";
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
                    <svg
                      className="w-8 h-8 text-gray-400 cursor-pointer hover:text-pink-500"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>ic_fluent_gif_24_regular</title>
                      <desc>Created with Sketch.</desc>
                      <g
                        id="🔍-Product-Icons"
                        stroke="none"
                        stroke-width="1"
                        fill="currentColor"
                      >
                        <g id="ic_fluent_gif_24_regular" fill="currentColor">
                          <path
                            d="M18.75,3.50054297 C20.5449254,3.50054297 22,4.95561754 22,6.75054297 L22,17.2531195 C22,19.048045 20.5449254,20.5031195 18.75,20.5031195 L5.25,20.5031195 C3.45507456,20.5031195 2,19.048045 2,17.2531195 L2,6.75054297 C2,4.95561754 3.45507456,3.50054297 5.25,3.50054297 L18.75,3.50054297 Z M18.75,5.00054297 L5.25,5.00054297 C4.28350169,5.00054297 3.5,5.78404466 3.5,6.75054297 L3.5,17.2531195 C3.5,18.2196178 4.28350169,19.0031195 5.25,19.0031195 L18.75,19.0031195 C19.7164983,19.0031195 20.5,18.2196178 20.5,17.2531195 L20.5,6.75054297 C20.5,5.78404466 19.7164983,5.00054297 18.75,5.00054297 Z M8.01459972,8.87193666 C8.61149825,8.87193666 9.03352891,8.95326234 9.51677386,9.18532686 C9.82793289,9.33475204 9.95904407,9.70812933 9.80961888,10.0192884 C9.6601937,10.3304474 9.28681641,10.4615586 8.97565738,10.3121334 C8.67582824,10.1681491 8.43601415,10.1219367 8.01459972,10.1219367 C7.14788947,10.1219367 6.51103525,10.9182985 6.51103525,11.9943017 C6.51103525,13.0713011 7.14873038,13.8702789 8.01459972,13.8702789 C8.44322427,13.8702789 8.80607251,13.6904125 8.99484486,13.3695045 L9.001,13.354543 L9.001,12.620543 L8.62521827,12.6211937 C8.31142012,12.6211937 8.05163513,12.3899359 8.00699487,12.0885517 L8.00021827,11.9961937 C8.00021827,11.6823956 8.23147615,11.4226106 8.53286035,11.3779703 L8.62521827,11.3711937 L9.62682145,11.3711937 C9.94061961,11.3711937 10.2004046,11.6024516 10.2450448,11.9038358 L10.2518215,11.9961937 L10.2504852,13.5438774 L10.2504852,13.5438774 L10.2441303,13.5991827 L10.2441303,13.5991827 L10.2229651,13.6890602 L10.2229651,13.6890602 L10.2024697,13.7442077 C9.82606539,14.6343365 8.96156448,15.1202789 8.01459972,15.1202789 C6.38857781,15.1202789 5.26103525,13.707564 5.26103525,11.9943017 C5.26103525,10.2816525 6.38839145,8.87193666 8.01459972,8.87193666 Z M12.6289445,8.99393497 C12.9427427,8.99393497 13.2025276,9.22519285 13.2471679,9.52657705 L13.2539445,9.61893497 L13.2539445,14.381065 C13.2539445,14.726243 12.9741225,15.006065 12.6289445,15.006065 C12.3151463,15.006065 12.0553614,14.7748072 12.0107211,14.4734229 L12.0039445,14.381065 L12.0039445,9.61893497 C12.0039445,9.273757 12.2837665,8.99393497 12.6289445,8.99393497 Z M15.6247564,8.99393489 L17.6221579,9.00083497 C17.9673338,9.00202673 18.246188,9.28281321 18.2450039,9.62798912 C18.2439132,9.94178541 18.0117595,10.2007704 17.7102229,10.2443727 L17.6178421,10.2508313 L16.247,10.245543 L16.247,11.999543 L17.37,12.0004012 C17.6837982,12.0004012 17.9435831,12.2316591 17.9882234,12.5330433 L17.995,12.6254012 C17.995,12.9391993 17.7637421,13.1989843 17.4623579,13.2436246 L17.37,13.2504012 L16.247,13.249543 L16.2475985,14.3649711 C16.2475985,14.6787693 16.0163406,14.9385543 15.7149564,14.9831945 L15.6225985,14.9899711 C15.3088003,14.9899711 15.0490154,14.7587133 15.0043751,14.4573291 L14.9975984,14.3649711 L14.9975984,9.61677709 C14.9986853,9.30298081 15.230839,9.04399582 15.5323756,9.00039353 L15.6247564,8.99393489 Z"
                            id="🎨-Color"
                          ></path>
                        </g>
                      </g>
                    </svg>
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
