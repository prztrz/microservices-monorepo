declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USERS_PORT: string;
      DB_PORT: string;
      DB_URL: string;
      USERS_QUEUE_NAME: string;
      MSG_BROKER_URL: string;
    }
  }
}

export {};
