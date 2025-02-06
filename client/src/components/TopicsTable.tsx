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
    <div className="overflow-hidden bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl border border-white border-opacity-40 shadow-sm">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-50 bg-opacity-50 border-b border-gray-200">
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Topic
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {topics.map((topic) => (
            <tr
              key={topic.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4">
                <p className="text-sm text-gray-900 font-medium line-clamp-2">
                  {topic.topic}
                </p>
              </td>
              <td className="px-6 py-4">
                {topic.image_url ? (
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={topic.image_url}
                      alt="Topic"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-xs text-gray-500">No image</span>
                )}
              </td>
              <td className="px-6 py-4">
                {topic.sent_at ? (
                  <div className="flex items-center space-x-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-600">
                      Sent at {new Date(topic.sent_at).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-gray-300"></span>
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
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
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
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors duration-150"
                    title="Edit topic"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(topic.id)}
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-150"
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
