export const delay = (delayTime = 300): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayTime));
