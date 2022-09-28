import "./webchat.css";

import { useEffect, useState } from "react";

interface Props {
  botpressHost: string;
  botID: string;
}

const INJECTION_ID = "bp-webchat-injection";
const INJECTION_URL = "assets/modules/channel-web/inject.js";
const WEBCHAT_ID = "botpress-webchat";
const WRAPPER_ID = `${WEBCHAT_ID}-wrapper`;
let intervalId: ReturnType<typeof setInterval>;

const EmbeddedWebchat = (props: Props) => {
  const [webchatLoaded, setWebchatLoaded] = useState(false);
  const [webchatReady, setWebchatReady] = useState(false);

  const loadWebchat = () => {
    // Ensure the webchat is only added once to the page
    if (document.getElementById(INJECTION_ID)) {
      return;
    }

    const script = window.document.createElement("script");
    script.src = `${props.botpressHost}/${INJECTION_URL}`;
    script.id = INJECTION_ID;
    window.document.body.appendChild(script);

    intervalId = setInterval(() => {
      // Once added, the webchat takes some time before being ready to initialize
      if (window.botpressWebChat) {
        setWebchatLoaded(true);
        clearInterval(intervalId);
      }
    }, 500);
  };

  const webchatEventListener = (message: MessageEvent) => {
    if (message.data.chatId !== WEBCHAT_ID) {
      return;
    }

    if (message.data.name === "webchatLoaded") {
      // window.botpressWebChat.sendEvent(
      //   { type: "loadConversation", conversationId: Date.now().toString() },
      //   WEBCHAT_ID
      // );
      const contentWindow = (
        document.querySelector(`#${WRAPPER_ID} iframe`) as HTMLIFrameElement
      )?.contentWindow;
      contentWindow?.postMessage({ action: "new-session" }, "*");
      window.botpressWebChat.sendEvent({ type: "show" }, WEBCHAT_ID);
    } else if (message.data.name === "webchatReady") {
      setWebchatReady(true);
    }
  };

  useEffect(() => {
    loadWebchat();

    window.addEventListener("message", webchatEventListener);
    return () => window.removeEventListener("message", webchatEventListener);
  }, []);

  useEffect(() => {
    if (!webchatLoaded) {
      return;
    }

    const webchatConfig = {
      host: props.botpressHost,
      botId: props.botID,
      showConversationsButton: false,
      enableReset: false,
      chatId: WEBCHAT_ID,
      hideWidget: true,
      disableAnimations: true,
      className: "webchatIframe",
      showPoweredBy: false,
      showUserAvatar: false,
      enableResetSessionShortcut: false,
      enableTranscriptDownload: false,
      enableConversationDeletion: false,
      stylesheet: `${window.location.origin}/webchat-stylesheet.css`,
      closeOnEscape: false,
      containerWidth: "100%",
      layoutWidth: "100%",
    };

    window.botpressWebChat.init(webchatConfig, `#${WRAPPER_ID}`);
  }, [webchatLoaded]);

  return (
    <div id={WRAPPER_ID} className="webchatContainer">
      {!webchatReady && <div>loading</div>}
    </div>
  );
};

export default EmbeddedWebchat;
