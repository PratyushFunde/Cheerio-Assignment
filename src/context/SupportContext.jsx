import { useState } from "react"
import {
  connectionSteps,
  findSupportAnswer,
  getSuggestedQuestions,
  initialSupportMessages,
} from "../data/support-flow"
import { SupportContext } from "./support-context"

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

export function SupportProvider({ children }) {
  const [view, setView] = useState("dashboard")
  const [issueResolved, setIssueResolved] = useState(false)
  const [isResolving, setIsResolving] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState(initialSupportMessages)
  const [suggestedIds, setSuggestedIds] = useState(["cause", "safety", "fix"])

  const openSupport = () => setView("support")
  const closeSupport = () => setView("dashboard")

  const reconnectWhatsApp = () => {
    if (isResolving || issueResolved) return
    setIsResolving(true)
    setSuggestedIds([])
    const progressId = Date.now()
    setMessages((current) => [
      ...current,
      {
        id: progressId,
        sender: "system",
        time: getTime(),
        steps: connectionSteps,
        completedSteps: 0,
      },
    ])

    const completeStep = (step) => {
      window.setTimeout(() => {
        setMessages((current) =>
          current.map((message) =>
            message.id === progressId
              ? { ...message, completedSteps: step }
              : message,
          ),
        )
        if (step < connectionSteps.length) {
          completeStep(step + 1)
        } else {
          setIssueResolved(true)
          setIsResolving(false)
          setSuggestedIds(["resolved-status", "resolved-prevention"])
        }
      }, 550)
    }

    completeStep(1)
  }

  const sendMessage = (text, questionId) => {
    const value = text.trim()
    if (!value || isTyping) return
    const answer = findSupportAnswer(questionId, value, issueResolved)
    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: "user", time: getTime(), text: value },
    ])
    setSuggestedIds([])
    setIsTyping(true)
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          sender: "ai",
          time: getTime(),
          text: answer.reply,
          action: answer.action,
        },
      ])
      setSuggestedIds(answer.next ?? [])
      setIsTyping(false)
    }, 650)
  }

  const value = {
    closeSupport,
    isResolving,
    isTyping,
    issueResolved,
    messages,
    openSupport,
    reconnectWhatsApp,
    sendMessage,
    suggestions:
      isResolving || isTyping
        ? []
        : getSuggestedQuestions(suggestedIds, issueResolved),
    view,
  }

  return <SupportContext.Provider value={value}>{children}</SupportContext.Provider>
}
