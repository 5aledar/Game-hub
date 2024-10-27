// src/hooks/useInfiniteScroll.ts
import { useEffect, useRef } from 'react';

const useInfiniteScroll = (hasNextPage: boolean, loadMore: () => void, isLoading: boolean) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isLoading || !hasNextPage) return;

        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const callback: IntersectionObserverCallback = (entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        };

        observer.current = new IntersectionObserver(callback, options);
        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => {
            if (observer.current && lastElementRef.current) {
                observer.current.unobserve(lastElementRef.current);
            }
        };
    }, [isLoading, hasNextPage, loadMore]);

    return lastElementRef;
};

export default useInfiniteScroll;
