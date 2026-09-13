
import { useEffect } from "react";


const useKeyboard = (
  map: Record<string, (e: KeyboardEvent) => void>,
  active: boolean = true
) => {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const handler = map[e.key];
      if (handler) handler(e);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [map, active]);
}

export {useKeyboard};