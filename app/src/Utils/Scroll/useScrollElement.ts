
export const useScrollElement = (ref: React.RefObject<HTMLElement>) => {
  const scrollTo = (y: number) => {
    ref.current?.scrollTo({ top: y, behavior: "smooth" });
  };

  const scrollBy = (y: number) => {
    ref.current?.scrollBy({ top: y, behavior: "smooth" });
  };

  const scrollBottom = () => {
    if (!ref.current) return;
    ref.current.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return { scrollTo, scrollBy, scrollBottom };
};
