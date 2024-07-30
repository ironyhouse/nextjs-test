"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// More about next routing error handling:
// https://nextjs.org/docs/app/building-your-application/routing/error-handling

export default function Error()
{
	const router = useRouter();

	return (
		<div className="w-f h-full flex flex-col items-center justify-top p-4">
			<h1 className="text-9xl">404</h1>
			<h2 className="text-4xl my-8">Page not found</h2>
			<Button onClick={() => router.replace('/')} >Home</Button>
		</div>
	)
}