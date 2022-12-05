import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

export default function Slug(){
    const router = useRouter()

    let { slug } = router.query;

    slug = String(slug)
    const data: any = trpc.query.query.useQuery({slug: slug}).data?.content![0].content

    return (
        <>
          <Head>
            <title>Future</title>
            <meta name="description" content="Note down your theories and predictions and unlock them after a certain time" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex min-h-screen flex-col items-center justify-center bg-amber-50">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
                Predict the <span className="text-blue-900">Future</span>
              </h1>
              <div
                className="space-y-4 rounded-xl py-12 w-4/5 md:w-1/2 px-12 text-black border-2 border-black"
              >
                <div className="text-lg">
                    {data ?? "Loading"}
              </div>
                </div>
            </div>
          </main>
        </>
      );
}