import { Topic } from "../types/Topic";
import { Pagination } from "./Pagination";
import { TopicsTable } from "./TopicsTable";

interface TopicsSectionProps {
  topics: Topic[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEdit: (topic: Topic) => void;
  onDelete: (id: number) => void;
  onSchedule: (topic: Topic) => void;
}

export const TopicsSection: React.FC<TopicsSectionProps> = ({
  topics,
  totalPages,
  currentPage,
  onPageChange,
  onEdit,
  onDelete,
  onSchedule,
}) => (
  <div className="space-y-4">
    <div className="bg-white border border-white shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl border-opacity-40">
      <TopicsTable
        topics={topics}
        onEdit={onEdit}
        onDelete={onDelete}
        onSchedule={onSchedule}
      />
    </div>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  </div>
);
