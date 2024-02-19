import { ChatMessageType, chatAPI } from "../api/chat-api.ts";
import {
  AppDispatch,
  BaseThunkType,
  InferActionsTypes,
} from "./redux-store.ts";

//стартовые данные
let initialState = {
  messages: [] as ChatMessageType[],
};

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/CHAT/MESSAGES_RECEIVED": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    }
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({ type: "SN/CHAT/MESSAGES_RECEIVED", payload: { messages } } as const),
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

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
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
