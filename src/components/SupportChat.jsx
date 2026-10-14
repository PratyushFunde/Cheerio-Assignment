import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  LoaderCircle,
  Maximize2,
  MessageCircle,
  MoreHorizontal,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"
import { useSupport } from "../context/support-context"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

function BotIcon() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-200">
      <Bot size={16} />
    </div>
  )
}

function Message({ message }) {
  const { isResolving, issueResolved, reconnectWhatsApp, sendMessage } = useSupport()

  if (message.sender === "system") {
    const finished = message.completedSteps === message.steps.length
    return (
      <div className="ml-10 space-y-3">
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-blue-600" />
              <p className="text-sm font-semibold text-slate-900">Reconnect WhatsApp</p>
            </div>
            <span className="text-[10px] text-slate-400">{message.time}</span>
          </div>
          <div className="space-y-2.5">
            {message.steps.map((item, index) => {
              const complete = index < message.completedSteps
              const active = index === message.completedSteps
              return (
              <div key={item} className={`flex items-center gap-2 text-xs ${complete ? "text-slate-700" : "text-slate-400"}`}>
                {complete ? (
                  <CheckCircle2 size={14} className="text-emerald-500" fill="#d1fae5" />
                ) : active ? (
                  <LoaderCircle size={14} className="animate-spin text-blue-500" />
                ) : (
                  <span className="ml-0.5 size-3 rounded-full border border-slate-300" />
                )}
                {item}
              </div>
              )
            })}
          </div>
        </Card>
        {finished && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-emerald-800">
              <span className="text-lg">🎉</span> Great! Your WhatsApp connection is now active.
            </p>
            <p className="mt-1 pl-7 text-xs text-emerald-700">Your automation is working again.</p>
          </div>
        )}
      </div>
    )
  }

  if (message.sender === "user") {
    return (
      <div className="ml-auto flex max-w-[82%] justify-end gap-2">
        <div className="rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 text-sm text-white shadow-sm">
          <div className="whitespace-pre-line">{message.text}</div>
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-blue-100">
            {message.time} <Check size={11} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2.5">
      <BotIcon />
      <div className="max-w-[88%]">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-900">AI Support</span>
          <span className="text-[10px] text-slate-400">{message.time}</span>
        </div>
        <Card className="rounded-tl-sm p-4 text-sm leading-6 text-slate-700">
          <p className="whitespace-pre-line">{message.text}</p>
          {message.action === "reconnect" && !issueResolved && (
            <div className="mt-4 border-t border-slate-100 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={reconnectWhatsApp}
                disabled={isResolving}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                {isResolving ? (
                  <><LoaderCircle size={14} className="animate-spin" /> Reconnecting...</>
                ) : (
                  <><RefreshCw size={14} /> Reconnect WhatsApp</>
                )}
              </Button>
              <p className="mt-3 text-xs text-slate-400">Or you can</p>
              <button
                className="mt-1 text-xs font-semibold text-blue-600 hover:underline"
                onClick={() => sendMessage("Can I contact human support?", "human")}
              >
                Contact human support
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function SupportChat() {
  const {
    closeSupport,
    isResolving,
    isTyping,
    issueResolved,
    messages,
    sendMessage,
    suggestions,
  } = useSupport()
  const [input, setInput] = useState("")
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const submit = (event) => {
    event.preventDefault()
    sendMessage(input)
    setInput("")
  }

  return (
    <div className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#eff6ff,transparent_35%),#f8fafc] p-0 sm:p-4">
      <div className="mx-auto flex h-full max-w-5xl overflow-hidden bg-white shadow-2xl shadow-slate-200/70 sm:rounded-2xl sm:border sm:border-slate-200">
        <aside className="hidden w-72 border-r border-slate-200 bg-slate-50/70 p-6 md:block">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Sparkles size={16} fill="currentColor" />
            </div>
            <span className="font-bold text-slate-950">Cheerio AI</span>
          </div>
          <Button variant="ghost" className="mt-8 w-full justify-start" onClick={closeSupport}>
            <ArrowLeft size={16} /> Back to dashboard
          </Button>
          <div className="mt-8">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Active issue</p>
            <div className="mt-3 rounded-xl border border-red-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <MessageCircle size={17} className="text-emerald-500" fill="currentColor" />
                <p className="text-sm font-semibold text-slate-900">WhatsApp Lead Follow-up</p>
              </div>
              <Badge className="mt-3" variant={issueResolved ? "success" : "destructive"}>
                {issueResolved ? "Resolved" : "Connection failed"}
              </Badge>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                {issueResolved ? "Connection restored and automation is running." : "Authorization expired. 5 recent failures detected."}
              </p>
            </div>
          </div>
          <div className="mt-auto pt-8">
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-900">AI-powered support</p>
              <p className="mt-1 text-xs leading-5 text-blue-700">Get guided help and resolve automation issues in minutes.</p>
            </div>
          </div>
        </aside>
        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={closeSupport}>
                <ArrowLeft size={18} />
              </Button>
              <BotIcon />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-slate-950">AI Support</h1>
                  <Badge className="px-1.5 py-0.5 text-[9px]">BETA</Badge>
                </div>
                <p className="text-xs text-slate-500">We’re here to help you fix issues quickly.</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon"><MoreHorizontal size={18} /></Button>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex"><Maximize2 size={16} /></Button>
              <Button variant="ghost" size="icon" onClick={closeSupport}><X size={18} /></Button>
            </div>
          </header>
          <div className="border-b border-slate-100 p-4 sm:px-6">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <MessageCircle size={18} className="shrink-0 text-emerald-500" fill="currentColor" />
                <p className="truncate text-xs font-semibold text-slate-700">Context: WhatsApp Lead Follow-up</p>
              </div>
              <Badge variant={issueResolved ? "success" : "destructive"}>{issueResolved ? "Healthy" : "Failed"}</Badge>
            </div>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
            {messages.map((message) => <Message key={message.id} message={message} />)}
            {isTyping && (
              <div className="flex items-center gap-2.5">
                <BotIcon />
                <Card className="flex items-center gap-1 rounded-tl-sm px-4 py-3">
                  <span className="size-1.5 animate-bounce rounded-full bg-slate-400" />
                  <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:120ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:240ms]" />
                </Card>
              </div>
            )}
            {issueResolved && (
              <Button onClick={closeSupport} className="ml-10">
                Go back to dashboard <ChevronRight size={15} />
              </Button>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={submit} className="border-t border-slate-200 bg-white p-3 sm:px-6">
            {suggestions.length > 0 && (
              <div className="mb-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Suggested questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() => sendMessage(suggestion.question, suggestion.id)}
                      disabled={isTyping || isResolving}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 disabled:opacity-50"
                    >
                      {suggestion.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Type your message..."
              />
              <Button size="icon" type="submit" disabled={!input.trim() || isTyping || isResolving} className="size-8">
                <Send size={15} />
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default SupportChat
