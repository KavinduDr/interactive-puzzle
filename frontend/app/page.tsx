'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => router.push('/puzzle')} className="hover:cursor-pointer">Puzzle</button>
    </div>
  );
}
