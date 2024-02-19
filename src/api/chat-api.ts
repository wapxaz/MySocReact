import { ignore } from "antd/es/theme/useToken";

let subscribers = {
  "messages-received": [] as Array<MessagesReceivedSubscriberType>,
  "status-changed": [] as Array<StatusChangedSubscriberType>,
};

let ws: WebSocket | null = null;

const closeHandler = () => {
  console.log("CLOSE WS");
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["messages-received"].forEach((s) => s(newMessages));
};

const openHandler = () => {
  notifySubscribersAboutStatus("ready");
};

const errorHandler = () => {
  notifySubscribersAboutStatus("error");
  console.log("REFRESH PAGE");
};

//удаление подписчиков
const cleanUp = () => {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
};

//уведомление подписчиков об изменении статуса
const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach((s) => s(status));
};
//создание WebSocket
function createChannel() {
  cleanUp();
  ws?.close();
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscribersAboutStatus("pending");
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error", errorHandler);
}

export const chatAPI = {
  subscribe(
    eventName: EventsType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(
        (s) => s !== callback
      );
    };
  },
  unsubscribe(
    eventName: EventsType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      (s) => s !== callback
    );
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
  start() {
    createChannel();
  },
  stop() {
    subscribers["messages-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
    ws?.close();
  },
};

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

export type ChatMessageReducerType = ChatMessageType & { id: string };
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
type EventsType = "messages-received" | "status-changed";
export type StatusType = "pending" | "ready" | "error";
