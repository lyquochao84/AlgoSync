"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./MessageModal.module.css";

import { AiOutlineMessage } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiImageFill } from "react-icons/ri";
import { LuSticker } from "react-icons/lu";
import { HiMiniGif } from "react-icons/hi2";
import { TbMessage2Code } from "react-icons/tb";

import { MessageModalProps } from "@/types/MessageModal/MessageModal";
import Link from "next/link";
import NewMessageModal from "./NewMessageModal/NewMessageModal";

const TABS = ["All Messages", "Group Messages", "House Messages"] as const;
type Tab = (typeof TABS)[number];

const mockUsers = [
  { name: "Hao", avatar: "https://i.pravatar.cc/100?img=1" },
  { name: "Kevin", avatar: "https://i.pravatar.cc/100?img=2" },
  { name: "Juliet", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Juliet", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Juliet", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Juliet", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Juliet", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Juliet", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Juliet", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Juliet", avatar: "https://i.pravatar.cc/100?img=3" },
];

const mockGroups = [
  { name: "Nerd Devs", avatar: "/Dashboard_Logo/ai.png" },
  { name: "AlgoSync Mods", avatar: "/dashboard_logo.png" },
];

const messages = [
  {
    text: "Hello, dev!",
    sender: "them",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    text: "Let’s build something cool!",
    sender: "me",
    status: "sent",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    text: "Sounds awesome!",
    sender: "them",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    text: "We’ll deploy it tonight!",
    sender: "me",
    status: "read",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
];

const MessageModal: React.FC<MessageModalProps> = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState<Tab>("All Messages");
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [showNewChatModal, setShowNewChatModal] = useState<boolean>(false);

  // "ESC" Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Chat Content
  const chatContent = (
    <div className={styles.chat_wrapper}>
      <div className={styles.chat_box}>
        {messages.map((msg, idx) => {
          const isLastFromMe =
            msg.sender === "me" &&
            idx ===
              messages
                .map((m, i) => (m.sender === "me" ? i : null))
                .filter((i) => i !== null)
                .pop();

          return (
            <>
              {msg.sender === "me" ? (
                <>
                  <div className={styles.chat_row_right}>
                    <div className={styles.chat_bubble_right}>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                  {isLastFromMe && msg.status && (
                    <span className={styles.message_status}>
                      {msg.status === "read" ? "Readed" : "Sent"}
                    </span>
                  )}
                </>
              ) : (
                <div className={styles.chat_row_left}>
                  <Link href="/dashboard">
                    <Image
                      src={msg.avatar}
                      alt="avatar"
                      width={36}
                      height={36}
                      className={styles.message_avatar}
                    />
                  </Link>
                  <div className={styles.chat_bubble_left}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>

      <div className={styles.chat_input_box}>
        <div className={styles.chat_input_icons}>
          <label className={styles.icon_button}>
            <RiImageFill />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size > 100 * 1024 * 1024) {
                  alert("File too large. Max 100MB allowed.");
                  return;
                }
              }}
              hidden
            />
          </label>
          <button className={styles.icon_button}>
            <LuSticker />
          </button>
          <button className={styles.icon_button}>
            <HiMiniGif />
          </button>
        </div>

        <input
          type="text"
          className={styles.message_input}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // send message logic
            }
          }}
        />
        <button className={styles.send_button}>Send</button>
      </div>
    </div>
  );

  // Open/Close New Message Modal
  const openNewMessageModal = () => setShowNewChatModal(true);
  const closeNewMessageModal = () => setShowNewChatModal(false);

  return (
    <div className={styles.message_modal_overlay} onClick={onClose}>
      <div
        className={styles.message_modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.message_modal_header}>
          <div className={styles.message_header_wrapper}>
            <AiOutlineMessage className={styles.message_header_icon} />
            <h3>Messages</h3>
          </div>
          <button className={styles.message_modal_close} onClick={onClose}>
            <IoMdCloseCircleOutline />
          </button>
        </div>
        
        {/* Tab Header */}
        <div className={styles.message_tab_header}>
          <div className={styles.message_tab_list}>
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`${styles.message_tab} ${
                  selectedTab === tab ? styles.active_tab : ""
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className={styles.new_message_button} onClick={openNewMessageModal}>
            <TbMessage2Code className={styles.new_message_icon} />
          </button>
        </div>
        
        {/* Tab Content */}
        {selectedTab === "House Messages" ? (
          <div className={styles.full_chat}>{chatContent}</div>
        ) : (
          <div className={styles.split_view}>
            <div className={styles.user_list}>
              {(selectedTab === "All Messages" ? mockUsers : mockGroups).map(
                (item, idx) => (
                  <div
                    key={idx}
                    className={`${styles.user_entry} ${
                      selectedUser === idx ? styles.active_user : ""
                    }`}
                    onClick={() => setSelectedUser(idx)}
                  >
                    <Image
                      className={styles.user_avatar}
                      src={item.avatar}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    <p className={styles.user_name}>{item.name}</p>
                  </div>
                )
              )}
            </div>
            <div className={styles.chat_area}>{chatContent}</div>
          </div>
        )}

        {/* New Message Modal */}
        {showNewChatModal && (
          <NewMessageModal onClose={closeNewMessageModal} />
        )}
      </div>
    </div>
  );
};

export default MessageModal;
