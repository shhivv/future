import { type NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const create = trpc.create.create.useMutation();

  const handleCreate = async (text: string, date: Date) => {
    let slug = (await create.mutateAsync({ text, date } )).slug

    Router.push(`/${slug}`)
  }
  let [form, setForm] = useState({text: "", date: new Date()})
  return (
    <>
      <Head>
        <title>Future</title>
        <meta name="description" content="Notes that unlock in the future when the time is right" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-amber-50">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
            <span className="text-blue-900">Future</span>

          </h1>
          <p className="text-2xl">
          Notes that unlock in the future when the time is right

          </p>

          <div
            className="space-y-4 rounded-xl py-12 w-4/5 md:w-1/2 px-12 text-black border-2 border-black"
          >
            <div className="text-lg">
            <textarea
    value={form.text}
    maxLength={3000}
    onChange={(e) => setForm({ ...form, text: e.target.value })}
    placeholder="Type your theories and predictions"
    className="w-full py-4 font-normal border-2 border-black rounded-md focus:outline-none"
    required
/>
<input
    type="date"
    maxLength={3000}
    onChange={(e) => setForm({ ...form, date: new Date(e.target.value) })}
    className="w-full py-2 font-normal  border-2 border-black rounded-md focus:outline-none"
    required
/>

            </div>
            <button onClick={() => {
              handleCreate(form.text, form.date)
            }} disabled={create.isLoading}
            className="border-2 border-black rounded-md focus:outline-none py-2 px-6 hover:bg-black hover:text-amber-50">
              
        Submit
      </button>
          </div>

        </div>
      </main>
    </>
  );
};

export default Home;
