"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Mic, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AssistantPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your WaterWise Assistant. I can help you with water-saving tips, answer questions about your usage, or provide recommendations. How can I help you today?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your recent usage patterns, I recommend reducing kitchen tap usage by setting a timer for washing dishes.",
        "Your bathroom usage is optimal! Keep up the good work.",
        "Did you know that fixing a leaky faucet can save up to 3,000 gallons of water per year?",
        "I notice your garden water usage is below recommended levels. Consider checking if your plants are getting enough water.",
        "Your water usage has decreased by 15% compared to last month. Great job conserving water!",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        role: "assistant",
        content: randomResponse,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container flex h-[calc(100vh-2rem)] flex-col py-6">
      <div className="mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Water Assistant</h2>
        <p className="text-muted-foreground">Get personalized water-saving tips and insights</p>
      </div>

      <Card className="flex flex-1 flex-col">
        <CardContent className="flex h-full flex-col p-4">
          <div className="flex-1 overflow-y-auto pr-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("mb-4 flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "flex max-w-[80%] items-start gap-3 rounded-lg px-4 py-2",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className="mt-0.5 h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="mt-0.5 h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4 flex justify-start">
                <div className="flex max-w-[80%] items-center gap-3 rounded-lg bg-muted px-4 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.2s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
            <Button type="button" size="icon" variant="outline" className="shrink-0">
              <Mic className="h-4 w-4" />
              <span className="sr-only">Use voice input</span>
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about water usage or saving tips..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

