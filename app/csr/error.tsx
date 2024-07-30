"use client"
import { Button } from "@/components/ui/button";
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

	console.error("ERROR: An error occurred in CSR:", error);

	return (
		<div className="w-f h-full flex flex-col items-center justify-top p-4">
			<h2>Something went wrong! </h2>
			<Button className="m-4" onClick={() => reset()}>Try again</Button>
			<Button onClick={() => router.replace('/')} >Home</Button>
		</div>
	)
}