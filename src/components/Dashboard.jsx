import {
  Bell,
  Bot,
  ChevronRight,
  LayoutDashboard,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  X,
  Zap,
} from "lucide-react"
import { useSupport } from "../context/support-context"
import { Avatar } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const menu = [
  [LayoutDashboard, "Home"],
]

const automations = [
  {
    name: "WhatsApp Lead Follow-up",
    description: "Sends follow-up messages to new leads",
    channel: "WhatsApp",
    status: "Failed",
    lastRun: "2 mins ago",
    rate: "0%",
    tone: "green",
  },
  {
    name: "Instagram DM Auto Reply",
    description: "Auto reply to Instagram DMs",
    channel: "Instagram",
    status: "Healthy",
    lastRun: "1 min ago",
    rate: "98%",
    tone: "pink",
  },
  {
    name: "Email Follow-up",
    description: "Sends email follow-ups",
    channel: "Email",
    status: "Healthy",
    lastRun: "5 mins ago",
    rate: "100%",
    tone: "purple",
  },
  {
    name: "Order Confirmation SMS",
    description: "Sends order confirmation via SMS",
    channel: "SMS",
    status: "Healthy",
    lastRun: "12 mins ago",
    rate: "100%",
    tone: "blue",
  },
]

const stats = [
  ["WhatsApp Messages", "12,540", "/ 100,000", 13],
  ["Emails Sent", "8,320", "/ 50,000", 17],
  ["SMS Sent", "4,120", "/ 20,000", 21],
  ["Active Contacts", "6,782", "/ 20,000", 34],
]

function Sidebar() {
  const { openSupport } = useSupport()

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white px-4 py-4 lg:flex lg:flex-col">
      <div className="mb-5 flex items-center gap-2 px-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-200">
          <Sparkles size={17} fill="currentColor" />
        </div>
        <span className="text-base font-bold tracking-tight text-slate-900">Cheerio AI</span>
      </div>
      <nav className="space-y-1">
        {menu.map(([Icon, label], index) => (
          <button
            key={label}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
              index === 0
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={openSupport}
          className="group w-full rounded-xl border border-blue-100 bg-blue-50 p-3 text-left transition hover:border-blue-200 hover:bg-blue-100"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
            <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Bot size={17} />
            </span>
            Ask AI Assistant
          </div>
          <p className="mt-2 text-xs leading-5 text-blue-700">
            Diagnose and resolve issues instantly.
          </p>
        </button>
      </div>
    </aside>
  )
}

function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
          Good morning, Priya <span aria-hidden>👋</span>
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Here’s what’s happening with your automations.
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
        </Button>
        <div className="hidden h-7 w-px bg-slate-200 sm:block" />
        <Avatar>PS</Avatar>
        <div className="hidden leading-tight sm:block">
          <div className="text-sm font-semibold text-slate-900">Priya Sharma</div>
          <div className="text-xs text-slate-500">Acme Retail</div>
        </div>
      </div>
    </header>
  )
}

function IssueAlert() {
  const { issueResolved, openSupport } = useSupport()
  if (issueResolved) {
    return (
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">
        <div className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Zap size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold">WhatsApp connection restored</p>
          <p className="compact-copy text-xs text-emerald-700">Your automation is healthy and running again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-3 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
          !
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">Your WhatsApp follow-ups have stopped working</p>
          <p className="compact-copy mt-0.5 text-xs text-slate-600">We detected an issue with your WhatsApp connection.</p>
        </div>
      </div>
      <Button variant="destructive" size="sm" onClick={openSupport}>
        Fix this issue
      </Button>
      <X className="hidden text-slate-400 sm:block" size={16} />
    </div>
  )
}

function AutomationRow({ automation, index }) {
  const { issueResolved, openSupport } = useSupport()
  const isIssue = index === 0
  const healthy = !isIssue || issueResolved
  const iconColors = {
    green: "bg-emerald-100 text-emerald-600",
    pink: "bg-pink-100 text-pink-600",
    purple: "bg-violet-100 text-violet-600",
    blue: "bg-blue-100 text-blue-600",
  }

  return (
    <div
      onClick={isIssue && !healthy ? openSupport : undefined}
      className={`grid items-center gap-4 px-4 py-2.5 md:grid-cols-[2fr_1fr_.8fr_.8fr_.55fr_auto] ${
        isIssue && !healthy
          ? "cursor-pointer bg-red-50/70 hover:bg-red-50"
          : "hover:bg-slate-50/80"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${iconColors[automation.tone]}`}>
          <MessageCircle size={17} fill="currentColor" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{automation.name}</p>
          <p className="compact-copy truncate text-xs text-slate-500">{automation.description}</p>
        </div>
      </div>
      <div className="hidden text-xs font-medium text-slate-600 md:block">{automation.channel}</div>
      <div className="hidden md:block">
        <Badge variant={healthy ? "success" : "destructive"}>
          {healthy ? "Healthy" : "Failed"}
        </Badge>
      </div>
      <div className="hidden text-xs text-slate-600 md:block">{automation.lastRun}</div>
      <div className={`hidden text-xs font-semibold md:block ${healthy ? "text-slate-700" : "text-red-600"}`}>
        {healthy && isIssue ? "100%" : automation.rate}
      </div>
      <ChevronRight className="ml-auto text-slate-400" size={16} />
      {isIssue && !healthy && (
        <div className="issue-details col-span-full hidden grid-cols-[2fr_1fr_1.55fr] gap-6 border-t border-red-200 pt-2.5 md:grid">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Issue</p>
            <p className="mt-1 text-xs font-semibold text-slate-800">WhatsApp connection expired</p>
            <p className="text-[11px] text-slate-500">Authorization needs to be renewed.</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Recent failures</p>
            <p className="mt-1 text-lg font-bold text-slate-900">5</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Last successful</p>
            <p className="mt-1 text-xs font-semibold text-slate-700">May 14, 2024 at 10:32 AM</p>
          </div>
        </div>
      )}
    </div>
  )
}

function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Header />
        <main className="mx-auto h-[calc(100vh-72px)] max-w-7xl overflow-hidden p-4 sm:px-6 sm:py-4">
          <IssueAlert />
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-950">Automations</h2>
              <p className="mt-0.5 text-xs text-slate-500">Manage and monitor your active workflows</p>
            </div>
            <Button size="sm"><Plus size={15} /> Create automation</Button>
          </div>
          <Card className="overflow-hidden">
            <div className="hidden grid-cols-[2fr_1fr_.8fr_.8fr_.55fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:grid">
              <span>Name</span><span>Channel</span><span>Status</span><span>Last execution</span><span>Success</span><span />
            </div>
            <div className="divide-y divide-slate-200">
              {automations.map((automation, index) => (
                <AutomationRow key={automation.name} automation={automation} index={index} />
              ))}
            </div>
          </Card>
          <Card className="usage-card mt-4">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm">Usage overview <span className="font-normal text-slate-400">(This month)</span></CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 px-4 pb-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map(([label, value, limit, progress]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-slate-500">{label}</p>
                  <p className="mt-1 text-lg font-bold text-slate-950">{value} <span className="text-xs font-normal text-slate-400">{limit}</span></p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
