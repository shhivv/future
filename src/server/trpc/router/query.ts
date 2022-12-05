import { z } from "zod";

import { router, publicProcedure, supabase } from "../trpc";

export const queryRouter = router({
  query: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {

      const { data } = (await supabase.from("content").select().eq("slug", input.slug))

      if(data!.length === 0){
        return {
          content: [{
            content: "This note does not exist"
          }]
        }
      }else if(new Date(data![0].expire) >  new Date()){
        return {
          content: [{
            content: `This note has not been unlocked yet! Unlocks on ${data![0].expire}`
          }]
        }
      }
      return {
        content: data,
      };
    }),
});
