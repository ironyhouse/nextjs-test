"use client"
import { useRouter } from "next/navigation";

export default function Error({
	error,
	reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
})
{
	const router = useRouter();

	console.error("ERROR: An error occurred in SSG:", error);

	return (
		<div className="w-f h-full flex flex-col items-center justify-top p-4">
			<h2>Something went wrong! </h2>
			<button className="mt-4" onClick={() => reset()}>Try again</button>
			<button onClick={() => router.replace('/')} >Home</button>
		</div>
	)
}