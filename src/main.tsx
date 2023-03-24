import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

declare global {
  interface Webchat {
    init: (options: any, id?: string) => void
    sendEvent: (event: any, id?: string) => void
    onEvent: (
      callback: (event: WebchatEvent) => void,
      topics: WebchatEventType[],
      id?: string
    ) => void
  }

  type WebchatEventType =
    | "LIFECYCLE.LOADED"
    | "LIFECYCLE.READY"
    | "UI.OPENED"
    | "UI.CLOSED"
    | "UI.RESIZE" // is this necessary ?
    | "UI.SET-CLASS" // is this necessary ?
    | "CONFIG.SET"
    | "MESSAGE.SENT"
    | "MESSAGE.RECEIVED"
    | "MESSAGE.SELECTED"
    | "USER.CONNECTED"

  interface WebchatEvent {
    type: WebchatEventType
    value: any
    chatId: string
  }

  interface Window {
    botpressWebChat: Webchat
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
