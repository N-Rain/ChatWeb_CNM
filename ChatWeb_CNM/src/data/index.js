import { faker } from "@faker-js/faker";
import { Typography } from "@mui/material";
import {
  ChatCircleText,
  Gear,
  GearSix,
  User,
  AddressBook,
} from "phosphor-react";
import { date } from "yup";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "Settings",
    icon: <Gear />,
  }
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleText size={28} color="#ffffff" weight="fill" />,

  },
  {
    index: 1,
    icon: <AddressBook size={28} color="#ffffff" weight="fill" />,
  },

];
// const Nav_Tabs = [
//   {
//     index: 0,
//     Text: <Typography fontSize={14} fontFamily='Segoe UI' fontWeight={700} > Tất cả</Typography>
//   },
//   {
//     index: 1,
//     Text: <Typography fontSize={14} fontFamily='Segoe UI' fontWeight={700} > Chưa đọc</Typography>
//   },
//   {
//     index: 2,
//     Text: <Typography fontSize={14} fontFamily='Segoe UI' fontWeight={700} > Bạn bè</Typography>
//   },
//   {
//     index: 3,
//     Text: <Typography fontSize={14} fontFamily='Segoe UI' fontWeight={700} > Nhóm</Typography>
//   },
// ]
const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    date: faker.date.past(),
    unread: 0,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    date: faker.date.past(),
    unread: 2,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    date: faker.date.past(),
    unread: 3,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "04:00",
    date: faker.date.past(),
    unread: 0,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    date: faker.date.past(),
    unread: 0,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    date: faker.date.past(),
    unread: 0,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    date: faker.date.past(),
    unread: 0,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    date: faker.date.past(),
    unread: 0,
    online: false,
  },
];

const Chat_History = [
  {
    type: "msg",
    message: "Hi 👋🏻, How are ya ?",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },

  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },

  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
];

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];
const SHARED_LINKS = [
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  }, {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  }, {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
]
const SHARED_FILES = [
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  }, {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  }, {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },

]
export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  Chat_History,
  Message_options,
  SHARED_FILES,
  SHARED_LINKS

};
