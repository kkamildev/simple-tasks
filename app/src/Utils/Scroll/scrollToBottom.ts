
export const scrollToBottomRef = (ref: React.RefObject<HTMLElement>) => {
  if (!ref.current) return;

  ref.current.scrollTo({
    top: ref.current.scrollHeight,
    behavior: "smooth",
  });
};
