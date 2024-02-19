import {
  ChatMessageReducerType,
  ChatMessageType,
  StatusType,
  chatAPI,
} from "../api/chat-api.ts";
import {
  AppDispatch,
  BaseThunkType,
  InferActionsTypes,
} from "./redux-store.ts";
import { v1 } from "uuid";

//стартовые данные
let initialState = {
  messages: [] as ChatMessageReducerType[],
  status: "pending" as StatusType,
};

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/CHAT/MESSAGES_RECEIVED": {
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((m, index, array) => index >= array.length - 100), // храним в стейте только 100 сообщений
      };
    }
    case "SN/CHAT/STATUS_CHANGED": {
      return {
        ...state,
        status: action.payload.status,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({ type: "SN/CHAT/MESSAGES_RECEIVED", payload: { messages } } as const),
  statusChanged: (status: StatusType) =>
    ({ type: "SN/CHAT/STATUS_CHANGED", payload: { status } } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: AppDispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }

  return _newMessageHandler;
};

let _newStatusHandler: ((status: StatusType) => void) | null = null;

const statusChangeHandlerCreator = (dispatch: AppDispatch) => {
  if (_newStatusHandler === null) {
    _newStatusHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }

  return _newStatusHandler;
};
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch));
  chatAPI.subscribe("status-changed", statusChangeHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe("status-changed", statusChangeHandlerCreator(dispatch));
  chatAPI.stop();
};
export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };

type InitialStateType = typeof initialState;
// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>;
//общий тип для thunk
type ThunkType = BaseThunkType<ActionsTypes, void>;

export default chatReducer;
