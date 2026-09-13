
export const isVisibleRef = (ref: React.RefObject<HTMLElement | null>) => {
  if (!ref?.current) return false;

  const rect = ref.current.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
};
