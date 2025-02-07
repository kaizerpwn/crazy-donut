import React, { useState, useEffect, useCallback } from "react";
import { X, Search, Loader } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { GiphyImage } from "../types/GiphyImage";

interface GiphySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  giphyApiKey: string;
}

export const GiphySelectModal: React.FC<GiphySelectModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  giphyApiKey,
}) => {
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState<GiphyImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const searchGiphy = useCallback(
    async (query: string) => {
      if (query.length <= 2) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
            query
          )}&limit=18&rating=g`
        );
        const data = await response.json();
        const formattedGifs = data.data.map((gif: any) => ({
          id: gif.id,
          url: gif.images.original.url,
          title: gif.title,
          preview: gif.images.fixed_height.url,
        }));
        setGifs(formattedGifs);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [giphyApiKey]
  );

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      searchGiphy(debouncedSearch);
    }
  }, [debouncedSearch, searchGiphy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="w-full max-w-2xl bg-white border border-white shadow-xl bg-opacity-90 backdrop-filter backdrop-blur-md rounded-xl border-opacity-40">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Choose a GIF</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 rounded-lg hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search for GIFs..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none transition-all duration-200 
              focus:border-pink-500 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-20"
            />
            <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          </div>
        </div>

        <div className="p-4 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader className="w-6 h-6 text-pink-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {gifs.map((gif) => (
                <div
                  key={gif.id}
                  onClick={() => {
                    onSelect(gif.url);
                    onClose();
                  }}
                  className="relative overflow-hidden transition-all duration-200 rounded-lg cursor-pointer aspect-video hover:ring-4 hover:ring-pink-500 hover:ring-opacity-30"
                >
                  <img
                    src={gif.preview}
                    alt={gif.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
