import { router } from "../trpc";
import { createRouter } from "./create";
import { queryRouter } from "./query";

export const appRouter = router({
  create: createRouter,
  query: queryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
