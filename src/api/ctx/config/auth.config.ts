export type AuthConfig = {
  encryptionSecret: string;
  magicSecretKey: string;
};

const authConfig: (env?: typeof process.env) => AuthConfig = (
  env = process.env
) => ({
  encryptionSecret: process.env.ENCRYPTION_SECRET as string,
  magicSecretKey: process.env.MAGIC_SECRET_KEY as string,
});

export default authConfig;
