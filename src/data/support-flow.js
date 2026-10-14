export const connectionSteps = [
  "Renewing WhatsApp authorization",
  "Verifying connection",
  "Running a test message",
  "Confirming automation health",
]

export const initialSupportMessages = [
  {
    id: 1,
    sender: "ai",
    time: "10:35 AM",
    text: "Hi Priya! I found the reason your WhatsApp Lead Follow-up stopped working.\n\nThe account authorization has expired after 5 failed runs. No customer data was lost, and I can guide you through reconnecting it safely.",
  },
]

export const supportQuestions = [
  {
    id: "cause",
    question: "Why did my automation fail?",
    reply:
      "The WhatsApp authorization connected to this automation expired. When Cheerio tried to send follow-up messages, WhatsApp rejected the requests, which caused 5 failed runs.\n\nYour workflow and contacts are still safe. Only the connection needs to be renewed.",
    next: ["safety", "fix"],
  },
  {
    id: "safety",
    question: "Is my customer data safe?",
    reply:
      "Yes. Your contacts, message templates, and automation settings are safe. Reconnecting only renews permission to send WhatsApp messages—it does not delete or modify customer data.",
    next: ["fix", "missed"],
  },
  {
    id: "missed",
    question: "What happens to missed messages?",
    reply:
      "Once the connection is restored, new follow-ups will run normally. The 5 failed messages are kept in the activity log so you can review and retry them after reconnection.",
    next: ["fix", "cause"],
  },
  {
    id: "fix",
    question: "Help me reconnect WhatsApp",
    reply:
      "I’ll handle this in four safe steps: renew authorization, verify the connection, send a test message, and confirm the automation is healthy.\n\nReady to start?",
    action: "reconnect",
    next: ["safety", "human"],
  },
  {
    id: "human",
    question: "Can I contact human support?",
    reply:
      "Of course. I can prepare this issue for a support specialist with the automation name, failure history, and diagnosis included. For this demo, you can still use the guided reconnect below to resolve it immediately.",
    action: "reconnect",
    next: ["fix"],
  },
]

export const resolvedQuestions = [
  {
    id: "resolved-status",
    question: "Is my automation working now?",
    reply:
      "Yes. The WhatsApp connection is active, the test message was delivered, and your Lead Follow-up automation is healthy again.",
  },
  {
    id: "resolved-prevention",
    question: "How can I prevent this?",
    reply:
      "Keep WhatsApp connection alerts enabled and reconnect promptly when authorization is close to expiring. Cheerio will notify you on the dashboard if action is required.",
  },
]

export function findSupportAnswer(questionId, question, resolved = false) {
  const available = resolved
    ? [...resolvedQuestions, ...supportQuestions]
    : supportQuestions
  const exact = available.find((item) => item.id === questionId)
  if (exact) return exact

  const value = question.toLowerCase()
  if (value.includes("safe") || value.includes("data")) {
    return supportQuestions.find((item) => item.id === "safety")
  }
  if (value.includes("miss") || value.includes("retry")) {
    return supportQuestions.find((item) => item.id === "missed")
  }
  if (value.includes("why") || value.includes("fail") || value.includes("cause")) {
    return supportQuestions.find((item) => item.id === "cause")
  }
  if (value.includes("reconnect") || value.includes("fix") || value.includes("start")) {
    return supportQuestions.find((item) => item.id === "fix")
  }
  if (value.includes("human") || value.includes("agent") || value.includes("person")) {
    return supportQuestions.find((item) => item.id === "human")
  }
  if (resolved && (value.includes("working") || value.includes("status"))) {
    return resolvedQuestions[0]
  }

  return {
    id: "fallback",
    reply:
      "I’m focused on the WhatsApp connection issue. I can explain the failure, confirm your data is safe, review missed messages, or guide you through reconnecting the account.",
    next: ["cause", "safety", "fix"],
  }
}

export function getSuggestedQuestions(ids, resolved = false) {
  const available = resolved
    ? [...resolvedQuestions, ...supportQuestions]
    : supportQuestions
  const defaults = resolved
    ? ["resolved-status", "resolved-prevention"]
    : ["cause", "safety", "fix"]
  return (ids?.length ? ids : defaults)
    .map((id) => available.find((item) => item.id === id))
    .filter(Boolean)
}
