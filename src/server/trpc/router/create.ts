import { z } from "zod";

import { router, publicProcedure, supabase } from "../trpc";
import { nanoid} from "nanoid";
export const createRouter = router({
  create: publicProcedure
    .input(z.object({ text: z.string(), date: z.date() }))
    .mutation(async ({ input }) => {
      const slug = nanoid(42)
      const {error} = await supabase.from("content").insert({slug: slug, content: input.text, expire: input.date})
      console.log(error)
      return {
        slug: slug,
      };
    }),
});
