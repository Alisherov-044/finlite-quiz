import { useLocalstorage } from "@/hooks";

export function usePagination(key: string, totalPages: number) {
    const [currentPage, setCurrentPage] = useLocalstorage<number>(key, 1);

    function next() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function prev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function goTo(page: number) {
        setCurrentPage(page);
    }

    return { currentPage, next, prev, goTo };
}
