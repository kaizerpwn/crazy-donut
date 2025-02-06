import { useQuery } from "@tanstack/react-query";
import { Topic } from "../types/Topic";
import { TopicsAPI } from "../api/Topics/Topics";

interface UseTopicsReturn {
  topics: Topic[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

const useTopics = (): UseTopicsReturn => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const response = await TopicsAPI.getAllTopics();
      return response || [];
    },
  });

  return {
    topics: data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useTopics;
