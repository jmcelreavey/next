import type { RefObject } from "react";
import { useEffect, useState } from "react";

const useScrollBottom = (ref: RefObject<HTMLElement>) => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;

      const scrollPosition = ref.current.clientHeight + ref.current.scrollTop;
      const totalHeight = ref.current.scrollHeight;

      if (scrollPosition >= totalHeight - 5) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    if (ref?.current) {
      ref.current.addEventListener("scroll", onScroll);
    } else {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      if (ref?.current) {
        ref.current.removeEventListener("scroll", onScroll);
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, [ref, ref.current]);

  return isBottom;
};

export default useScrollBottom;
