import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const PaginationButton = ({
    onClick,
    disabled,
    active,
    children,
  }: {
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center min-w-[2.5rem] h-10 px-3
        text-sm font-medium rounded-lg transition-all duration-200
        ${
          active
            ? "bg-pink-500 text-white border-transparent"
            : "bg-white bg-opacity-80 text-gray-700 border border-gray-200 hover:bg-pink-50 hover:text-pink-600"
        }
        ${
          disabled
            ? "opacity-50 cursor-not-allowed hover:bg-white hover:text-gray-700"
            : "cursor-pointer"
        }
        focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white border border-white shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl border-opacity-40">
      <div className="px-4 py-3">
        <div className="sm:hidden">
          <div className="flex items-center justify-between gap-2">
            <PaginationButton
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft size={18} />
            </PaginationButton>
            <PaginationButton
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </PaginationButton>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <PaginationButton
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </PaginationButton>
            <PaginationButton
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight size={18} />
            </PaginationButton>
          </div>
        </div>

        <div className="hidden sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PaginationButton
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft size={18} />
            </PaginationButton>
            <PaginationButton
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </PaginationButton>

            {generatePageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <PaginationButton
                  key={index}
                  onClick={() => onPageChange(page)}
                  active={currentPage === page}
                >
                  {page}
                </PaginationButton>
              ) : (
                <span key={index} className="px-2 text-gray-500">
                  {page}
                </span>
              )
            )}

            <PaginationButton
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </PaginationButton>
            <PaginationButton
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight size={18} />
            </PaginationButton>
          </div>
        </div>
      </div>
    </div>
  );
};
