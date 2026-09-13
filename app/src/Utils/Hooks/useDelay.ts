

export const useDelay = (ms: number) => {
  return function <T>(callback: (resolve: (value: T) => void) => void): Promise<T> {
    return new Promise<T>((resolve) => {
      setTimeout(() => callback(resolve), ms);
    });
  };
};
