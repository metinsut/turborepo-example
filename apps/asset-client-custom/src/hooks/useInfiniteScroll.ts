import { useCallback, useRef } from 'react';

type Props = {
  loading: boolean;
  hasMore: boolean;
  fetchMore: () => void;
};

export default function useInfiniteScroll(props?: Props): (node: any) => void {
  const { fetchMore, hasMore, loading } = props;

  const observer = useRef(null);
  const itemRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entities) => {
        if (entities[0].isIntersecting && hasMore) {
          fetchMore();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [fetchMore, hasMore, loading]
  );

  return itemRef;
}
