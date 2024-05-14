import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";


const user_id = window.localStorage.getItem("user_id");

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {
    conversationsGroup: [],
    currentGroupConversation: null,
    currentGroupMessages: [],
  },
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        const user = el.participants.find(
          (elm) => elm._id.toString() !== user_id
        );
        return {
          id: el._id,
          user_id: user?._id,
          name: `${user?.firstName} ${user?.lastName}`,
          online: user?.status === "Online",
          img: faker.image.avatar(),
          // msg: el.messages.slice(-1)[0].text, 
          msg: faker.music.songName(),
          time: "9:36",
          unread: 0,
        };
      });

      state.direct_chat.conversations = list;
    },
    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
        (el) => {
          if (el?.id !== this_conversation._id) {
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== user_id
            );
            return {
              id: this_conversation._id._id,
              user_id: user?._id,
              name: `${user?.firstName} ${user?.lastName}`,
              online: user?.status === "Online",
              img: faker.image.avatar(),
              msg: faker.music.songName(),
              time: "9:36",
              unread: 0,

            };
          }
        }
      );
    },
    addDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      const user = this_conversation.participants.find(
        (elm) => elm._id.toString() !== user_id
      );
      state.direct_chat.conversations = state.direct_chat.conversations.filter(
        (el) => el?.id !== this_conversation._id
      );
      state.direct_chat.conversations.push({
        id: this_conversation._id._id,
        user_id: user?._id,
        name: `${user?.firstName} ${user?.lastName}`,
        online: user?.status === "Online",
        img: faker.image.avatar(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
      });
    },
    setCurrentConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
    },
    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));
      state.direct_chat.current_messages = formatted_messages;
    },
    addDirectMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload.message);
    },

    fetchGroupConversations(state, action) {
      const list = action.payload.conversationsGroup.map((group) => ({
        id: group._id,
        name: group.name,
        online: false, // Chưa hỗ trợ trạng thái trực tuyến cho nhóm
        img: faker.image.avatar(),
        msg: "", // Không hiển thị tin nhắn mới nhất của nhóm
        time: "9:36",
        unread: 0, // Số tin nhắn chưa đọc
      }));
      state.group_chat.conversationsGroup = list;
    },
    updateGroupConversation(state, action) {
      // Cập nhật thông tin về cuộc trò chuyện nhóm
    },
    addGroupConversation(state, action) {
      // Thêm một cuộc trò chuyện nhóm mới vào danh sách
    },
    setCurrentGroupConversation(state, action) {
      // Đặt cuộc trò chuyện nhóm hiện tại
      state.group_chat.currentGroupConversation = action.payload;
    },
    fetchCurrentGroupMessages(state, action) {
      // Lấy tin nhắn của cuộc trò chuyện nhóm hiện tại
      const messages = action.payload.messages;
      // Xử lý và định dạng tin nhắn nếu cần
      state.group_chat.currentGroupMessages = messages;
    },
    addGroupMessage(state, action) {
      // Thêm một tin nhắn mới vào cuộc trò chuyện nhóm hiện tại
      state.group_chat.currentGroupMessages.push(action.payload.message);
    },
  },
});

// Reducer
export default slice.reducer;

// Các actions cho chức năng chat nhóm
export const FetchGroupConversations = ({ conversationsGroup }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchGroupConversations({ conversationsGroup }));
  };
};

export const AddGroupConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addGroupConversation({ conversation }));
  };
};

export const UpdateGroupConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateGroupConversation({ conversation }));
  };
};

export const SetCurrentGroupConversation = (currentGroupConversation) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentGroupConversation(currentGroupConversation));
  };
};

export const FetchCurrentGroupMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentGroupMessages({ messages }));
  };
};

export const AddGroupMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addGroupMessage({ message }));
  };
};

// Reducer

// ----------------------------------------------------------------------

export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations }));
  };
};
export const AddDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConversation({ conversation }));
  };
};
export const UpdateDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversation({ conversation }));
  };
};

export const SetCurrentConversation = (current_conversation) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConversation(current_conversation));
  };
};


export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentMessages({ messages }));
  }
}

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectMessage({ message }));
  }
}