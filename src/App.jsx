import "./App.css"
import Dashboard from "./components/Dashboard"
import SupportChat from "./components/SupportChat"
import { SupportProvider } from "./context/SupportContext"
import { useSupport } from "./context/support-context"

function AppContent() {
  const { view } = useSupport()
  return view === "support" ? <SupportChat /> : <Dashboard />
}

export default function App() {
  return (
    <SupportProvider>
      <AppContent />
    </SupportProvider>
  )
}
