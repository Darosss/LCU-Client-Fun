declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_URL: string;
      NEXT_PUBLIC_BACKEND_PUBLIC: string;
    }
  }
}

export {};
