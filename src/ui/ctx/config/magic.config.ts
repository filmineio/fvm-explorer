export type MagicConfig = {
  key: string;
};

export const magicConfig = {
  key: process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY as string,
};
