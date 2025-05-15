declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USERS_PORT: string;
      DB_PORT: string;
      DB_HOST: string;
    }
  }
}

export {};
