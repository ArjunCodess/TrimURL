'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
})

export default function UrlShortenerForm() {
  const [shortUrl, setShortUrl] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL")
      }

      setShortUrl(data.shortUrl)
      toast({
        title: "URL Shortened",
        description: "Your shortened URL has been generated.",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to shorten URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL to shorten</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>Enter the long URL you want to shorten.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Shorten URL</Button>
        </form>
      </Form>
      {shortUrl && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Shortened URL:</h2>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  )
}