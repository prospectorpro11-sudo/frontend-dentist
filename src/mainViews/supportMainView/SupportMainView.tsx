'use client';

import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Form from "react-bootstrap/Form";

import Button from "@/components/button/Button";
import { useRootContext } from "@/contexts/RootContext";
import { triggerForm } from "@/shared/InternalService";
import { BUTTON_VARIANT_ENUM, COLORS_ENUM } from "@/shared/enums";
import {
  getSupportChatHistoryPaginated,
  getSupportChatMessages,
  mergeGuestSupportChat,
  sendSupportChatMessage,
  startSupportChat,
  SupportChat,
  SupportMessage,
} from "@/services/supportChat";
import { getSupportGuestSession, setSupportGuestSession, SupportGuestSession } from "@/services/tokenService";
import styles from "./supportMainView.module.scss";
import DashboardPageHeader from "@/components/dashboardPageHeader/DashboardPageHeader";
import { FaHeadphonesSimple, FaPaperPlane } from "react-icons/fa6";

dayjs.extend(relativeTime);

const SUPPORT_SUBJECTS = ["Order Issue", "Downloads", "Billing Issue", "Technical Issue", "Others"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SupportMainView = () => {
  const queryClient = useQueryClient();
  const { loggedInUser, setAuthEnable } = useRootContext();

  const [guestSession, setGuestSession] = useState<SupportGuestSession | null>(null);
  const [activeChatId, setActiveChatId] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const [startName, setStartName] = useState("");
  const [startEmail, setStartEmail] = useState("");
  const [startSubject, setStartSubject] = useState(SUPPORT_SUBJECTS[0]);
  const [startMessage, setStartMessage] = useState("");

  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [isMergingGuestSession, setIsMergingGuestSession] = useState(false);

  useEffect(() => {
    const storedSession = getSupportGuestSession();
    setGuestSession(storedSession);
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }

    setStartName(loggedInUser.displayName || loggedInUser.name || "");
    setStartEmail(loggedInUser.email || "");
  }, [loggedInUser]);

  useEffect(() => {
    if (!loggedInUser || !guestSession?.chatId || !guestSession?.guestToken || isMergingGuestSession) {
      return;
    }

    setIsMergingGuestSession(true);
    mergeGuestSupportChat({ chatId: guestSession.chatId, guestToken: guestSession.guestToken })
      .catch(() => null)
      .finally(async () => {
        setSupportGuestSession(null);
        setGuestSession(null);
        setIsMergingGuestSession(false);
        await queryClient.invalidateQueries({ queryKey: ["support-chat-history"] });
      });
  }, [loggedInUser, guestSession, isMergingGuestSession, queryClient]);

  const {
    data: chatHistoryPages,
    isLoading: isChatHistoryLoading,
    hasNextPage: hasMoreChatHistory,
    fetchNextPage: fetchNextChatHistory,
    isFetchingNextPage: isFetchingMoreChats,
  } = useInfiniteQuery({
    queryKey: ["support-chat-history", loggedInUser?.email || "guest", guestSession?.chatId || "none"],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) => {
      if (loggedInUser) {
        return getSupportChatHistoryPaginated({ limit: 10, cursor: pageParam });
      }

      if (guestSession?.chatId && guestSession?.guestToken) {
        return getSupportChatHistoryPaginated({
          chatId: guestSession.chatId,
          guestToken: guestSession.guestToken,
          limit: 10,
          cursor: pageParam,
        });
      }

      return Promise.resolve({ items: [] as SupportChat[], nextCursor: null, hasMore: false, total: 0 });
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
    enabled: Boolean(loggedInUser || guestSession?.chatId),
    retry: false,
    refetchOnWindowFocus: false,
  });
  const chatList = (chatHistoryPages?.pages || []).flatMap((page) => page.items || []);

  useEffect(() => {
    if (!chatList.length) {
      setActiveChatId("");
      return;
    }

    if (!activeChatId || !chatList.find((chat) => chat.id === activeChatId)) {
      setActiveChatId(chatList[0].id);
    }
  }, [chatList, activeChatId]);

  const activeGuestToken = useMemo(() => {
    if (!guestSession?.chatId || guestSession.chatId !== activeChatId) {
      return undefined;
    }

    return guestSession.guestToken;
  }, [guestSession, activeChatId]);

  const {
    data: messageList = [],
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["support-chat-messages", activeChatId, activeGuestToken || "user"],
    queryFn: () =>
      getSupportChatMessages({
        chatId: activeChatId,
        guestToken: loggedInUser ? undefined : activeGuestToken,
      }),
    enabled: Boolean(activeChatId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const startChatMutation = useMutation({
    mutationFn: startSupportChat,
    onSuccess: async (response) => {
      if (response?.guestToken) {
        const session = {
          chatId: response.chat.id,
          guestToken: response.guestToken,
          name: startName.trim(),
          email: startEmail.trim().toLowerCase(),
        };
        setSupportGuestSession(session);
        setGuestSession(session);
      }

      setActiveChatId(response.chat.id);
      setStartMessage("");
      setShowNewChatForm(false);

      await queryClient.invalidateQueries({ queryKey: ["support-chat-history"] });
      await refetchMessages();

      triggerForm({
        title: "",
        text: "Your support chat has started.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error: any) => {
      triggerForm({
        title: "",
        text: error?.response?.data?.message || error?.response?.data || "Failed to start chat.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendSupportChatMessage,
    onSuccess: async () => {
      setNewMessage("");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["support-chat-history"] }),
        queryClient.invalidateQueries({ queryKey: ["support-chat-messages", activeChatId] }),
      ]);
    },
    onError: (error: any) => {
      triggerForm({
        title: "",
        text: error?.response?.data?.message || error?.response?.data || "Failed to send message.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const validateAndStartChat = () => {
    const normalizedName = startName.trim();
    const normalizedEmail = startEmail.trim().toLowerCase();
    const normalizedMessage = startMessage.trim();

    if (!normalizedName) {
      triggerForm({ title: "", text: "Name is required.", icon: "error", confirmButtonText: "OK" });
      return;
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      triggerForm({ title: "", text: "Please enter a valid email address.", icon: "error", confirmButtonText: "OK" });
      return;
    }

    if (!normalizedMessage) {
      triggerForm({ title: "", text: "Please describe your issue.", icon: "error", confirmButtonText: "OK" });
      return;
    }

    startChatMutation.mutate({
      name: normalizedName,
      email: normalizedEmail,
      subject: startSubject,
      message: normalizedMessage,
    });
  };

  const sendMessage = () => {
    const message = newMessage.trim();
    if (!activeChatId || !message) {
      return;
    }

    sendMessageMutation.mutate({
      chatId: activeChatId,
      message,
      guestToken: loggedInUser ? undefined : activeGuestToken,
    });
  };

  const activeChat = chatList.find((chat) => chat.id === activeChatId) || null;
  const hasAnyChat = chatList.length > 0;
  const showStartFormOnly = !hasAnyChat && !isChatHistoryLoading && !showNewChatForm;

  const isOwnMessage = (message: SupportMessage) => {
    if (loggedInUser) {
      return message.senderType === "user";
    }

    return message.senderType === "guest";
  };

  return (
    <div className={styles.supportPage}>
      <DashboardPageHeader
        icon={FaHeadphonesSimple}
        title="Help Center"
        description="We're here to help! Submit a ticket or browse our knowledge base"
        stats={[
          { label: "Open Tickets", value: "3", color: COLORS_ENUM.SKY_BLUE },
          { label: "Resolved", value: "3", color: COLORS_ENUM.EMERALD },
          { label: "Avg Response", value: "3", color: COLORS_ENUM.INDIGO },
        ]}
        iconSize={22}
      />
      <div className={styles.pageHeader}>
        <div>
          <span className={styles.kicker}>Support Chat</span>
          <h3 className={styles.title}>Talk with DentistEmailList Support</h3>
          <p className={styles.subtitle}>Start as a guest with your name and email, then continue seamlessly after account registration.</p>
        </div>
        {!loggedInUser ? (
          <Button variant={BUTTON_VARIANT_ENUM.TEXT} onClick={() => setAuthEnable(true)}>
            Already have an account? Log in
          </Button>
        ) : null}
      </div>

      {showStartFormOnly ? (
        <section className={styles.startCard}>
          <div className={styles.cardHeader}>
            <div className={styles.headerIcon}>
              <FaPaperPlane />
            </div>
            <div className={styles.headerText}>
              <h4>Start a support chat</h4>
              <p>Share your issue and we will reply in this thread.</p>
            </div>
          </div>
          <div className={styles.cardContent}>
            <h4>Start a support chat</h4>
            <p>Share your issue and we will reply in this thread.</p>

            <div className={styles.formGrid}>
              <Form.Group className={styles.formGroup}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  value={startName}
                  onChange={(event) => setStartName(event.target.value)}
                  placeholder="Emma Taylor"
                />
              </Form.Group>

              <Form.Group className={styles.formGroup}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="email"
                  value={startEmail}
                  onChange={(event) => setStartEmail(event.target.value)}
                  placeholder="emmataylor7@example.com"
                />
              </Form.Group>
            </div>

            <Form.Group className={styles.formGroup}>
              <Form.Label>Topic</Form.Label>
              <Form.Select className={styles.formControl} value={startSubject} onChange={(event) => setStartSubject(event.target.value)}>
                {SUPPORT_SUBJECTS.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                className={styles.formControl}
                rows={5}
                value={startMessage}
                onChange={(event) => setStartMessage(event.target.value)}
                placeholder="Tell us what is happening and what you need help with."
              />
            </Form.Group>

            <div className={styles.startActions}>
              <Button
                variant={BUTTON_VARIANT_ENUM.ACTION}
                onClick={validateAndStartChat}
                disabled={startChatMutation.isPending}
                isLoading={startChatMutation.isPending}
              >
                Start Chat
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <div className={styles.chatLayout}>
          <aside className={styles.chatSidebar}>
            <div className={styles.sidebarHeader}>
              <div>
                <h4>Conversations</h4>
                <p>{loggedInUser ? "All support chats linked to your account" : "Your guest support chat"}</p>
              </div>
              <Button variant={BUTTON_VARIANT_ENUM.TEXT} onClick={() => setShowNewChatForm((value) => !value)}>
                {showNewChatForm ? "Cancel" : "New Chat"}
              </Button>
            </div>

            {showNewChatForm ? (
              <div className={styles.sidebarComposer}>
                {!loggedInUser ? (
                  <>
                    <Form.Control
                      className={styles.formControl}
                      value={startName}
                      onChange={(event) => setStartName(event.target.value)}
                      placeholder="Name"
                    />
                    <Form.Control
                      className={styles.formControl}
                      type="email"
                      value={startEmail}
                      onChange={(event) => setStartEmail(event.target.value)}
                      placeholder="Email"
                    />
                  </>
                ) : null}
                <Form.Select className={styles.formControl} value={startSubject} onChange={(event) => setStartSubject(event.target.value)}>
                  {SUPPORT_SUBJECTS.map((subject) => (
                    <option key={subject}>{subject}</option>
                  ))}
                </Form.Select>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className={styles.formControl}
                  value={startMessage}
                  onChange={(event) => setStartMessage(event.target.value)}
                  placeholder="What do you need help with?"
                />
                <Button
                  variant={BUTTON_VARIANT_ENUM.ACTION}
                  onClick={validateAndStartChat}
                  disabled={startChatMutation.isPending}
                  isLoading={startChatMutation.isPending}
                >
                  Create Chat
                </Button>
              </div>
            ) : null}

            <div className={styles.threadList}>
              {chatList.map((chat) => (
                <button
                  key={chat.id}
                  className={`${styles.threadItem} ${activeChatId === chat.id ? styles.threadItemActive : ""}`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div className={styles.threadTopRow}>
                    <strong>{chat.subject || "Support Chat"}</strong>
                    <span>{chat.lastMessageAt ? dayjs.unix(chat.lastMessageAt).fromNow() : ""}</span>
                  </div>
                  <div className={styles.threadPreview}>{chat.lastMessagePreview || "No messages yet."}</div>
                  <div className={styles.threadMetaRow}>
                    <span className={`${styles.statusPill} ${chat.status === "Resolved" ? styles.statusResolved : styles.statusOpen}`}>
                      {chat.status || "Open"}
                    </span>
                  </div>
                </button>
              ))}
              {hasMoreChatHistory ? (
                <Button
                  variant={BUTTON_VARIANT_ENUM.TEXT}
                  onClick={() => fetchNextChatHistory()}
                  disabled={isFetchingMoreChats}
                  isLoading={isFetchingMoreChats}
                >
                  Load More
                </Button>
              ) : null}
            </div>
          </aside>

          <section className={styles.chatPanel}>
            {activeChat ? (
              <>
                <div className={styles.chatPanelHeader}>
                  <div>
                    <h4>{activeChat.subject || "Support Chat"}</h4>
                    <p>
                      Started {dayjs.unix(activeChat.createdAt || activeChat.updatedAt).format("MMM D, YYYY h:mm A")}
                    </p>
                  </div>
                </div>

                <div className={styles.messagesWrap}>
                  {isMessagesLoading ? <div className={styles.stateCard}>Loading messages...</div> : null}
                  {!isMessagesLoading && !messageList.length ? <div className={styles.stateCard}>No messages yet.</div> : null}

                  {!isMessagesLoading &&
                    messageList.map((message) => (
                      <div
                        key={message.id}
                        className={`${styles.messageRow} ${isOwnMessage(message) ? styles.messageOwn : styles.messageOther}`}
                      >
                        <div className={styles.messageBubble}>
                          <div className={styles.messageMeta}>
                            <strong>{message.senderName || (message.senderType === "support" ? "Support" : "You")}</strong>
                            <span>{dayjs.unix(message.date).format("MMM D, h:mm A")}</span>
                          </div>
                          <p>{message.body}</p>
                        </div>
                      </div>
                    ))}
                </div>

                <div className={styles.composer}>
                  <Form.Control
                    className={styles.formControl}
                    as="textarea"
                    rows={2}
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    placeholder="Type your message..."
                  />
                  <Button
                    variant={BUTTON_VARIANT_ENUM.ACTION}
                    onClick={sendMessage}
                    disabled={sendMessageMutation.isPending || !newMessage.trim()}
                    isLoading={sendMessageMutation.isPending}
                  >
                    Send
                  </Button>
                </div>
              </>
            ) : (
              <div className={styles.stateCard}>Select a conversation to view messages.</div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default SupportMainView;
