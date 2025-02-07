import { Topic } from "../types/Topic";
import { Edit2, Send, Trash2 } from "lucide-react";

interface TopicsTableProps {
  topics: Topic[];
  onEdit: (topic: Topic) => void;
  onDelete: (id: number) => void;
  onSchedule: (topic: Topic) => void;
}

export const TopicsTable: React.FC<TopicsTableProps> = ({
  topics,
  onEdit,
  onDelete,
  onSchedule,
}) => {
  return (
    <div className="overflow-hidden bg-white border border-white shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl border-opacity-40">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-opacity-50 border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
              Topic
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
              Image
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {topics.map((topic) => (
            <tr
              key={topic.id}
              className="transition-colors duration-150 hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900 line-clamp-2">
                  {topic.topic}
                </p>
              </td>
              <td className="px-6 py-4">
                {topic.image_url ? (
                  <div className="relative w-12 h-12 overflow-hidden border border-gray-200 rounded-lg">
                    <img
                      src={topic.image_url}
                      alt="Topic"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <span className="text-xs text-gray-500">No image</span>
                )}
              </td>
              <td className="px-6 py-4">
                {topic.sent_at ? (
                  <div className="flex items-center space-x-1.5">
                    <span className="flex w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-600">
                      Sent at {new Date(topic.sent_at).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5">
                    <span className="flex w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="text-sm text-gray-600">Not sent</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onSchedule(topic)}
                    disabled={!!topic.sent_at}
                    className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-150 ${
                      topic.sent_at
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
                    }`}
                    title={topic.sent_at ? "Already sent" : "Schedule topic"}
                  >
                    <Send
                      size={16}
                      className={topic.sent_at ? "opacity-50" : ""}
                    />
                  </button>
                  <button
                    onClick={() => onEdit(topic)}
                    className="inline-flex items-center justify-center p-2 text-pink-600 transition-colors duration-150 rounded-lg cursor-pointer bg-pink-50 hover:bg-pink-100"
                    title="Edit topic"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(topic.id)}
                    className="inline-flex items-center justify-center p-2 text-red-600 transition-colors duration-150 rounded-lg cursor-pointer bg-red-50 hover:bg-red-100"
                    title="Delete topic"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
