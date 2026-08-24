import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyInViewProps = {
  children: ReactNode;
  /** Reserve space to avoid CLS while waiting */
  minHeight?: number | string;
  rootMargin?: string;
  className?: string;
};

/** Mount children only when near the viewport — keeps below-fold JS/images off LCP. */
export default function LazyInView({
  children,
  minHeight = 320,
  rootMargin = "240px 0px",
  className = "",
}: LazyInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {show ? children : null}
    </div>
  );
}
