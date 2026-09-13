
export const scrollToRef = (ref: React.RefObject<HTMLElement>, offset = 0) => {
  if (!ref.current) return;

  const top =
    ref.current.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};
