import instance from "@/services/baseServices";

export type SupportChat = {
  id: string;
  subject: string;
  status: string;
  createdAt: number;
  updatedAt: number;
  lastMessageAt: number;
  lastMessagePreview: string;
  lastSenderType: "user" | "guest" | "support";
  ownerUid: string;
  ownerEmail: string;
  guestName: string;
  guestEmail: string;
  mergedAt?: number;
};

export type SupportMessage = {
  id: string;
  body: string;
  date: number;
  senderType: "user" | "guest" | "support";
  senderName: string;
  senderEmail: string;
};

export type StartSupportChatPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type GuestSessionPayload = {
  chatId: string;
  guestToken: string;
};
export type SupportChatHistoryPage = {
  items: SupportChat[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
};

export type StartSupportChatResponse = {
  chat: SupportChat;
  messages: SupportMessage[];
  guestToken: string;
};

export const startSupportChat = async (payload: StartSupportChatPayload) => {
  const response = await instance.post<StartSupportChatResponse>("/support-chat/start", payload);
  return response.data;
};

export const getSupportChatHistory = async (payload?: Partial<GuestSessionPayload>) => {
  const response = await instance.post<SupportChat[]>("/support-chat/history", payload || {});
  return Array.isArray(response.data) ? response.data : [];
};

export const getSupportChatHistoryPaginated = async (payload?: Partial<GuestSessionPayload> & { limit?: number; cursor?: string | null }) => {
  const response = await instance.post<SupportChatHistoryPage>("/support-chat/history", {
    ...(payload || {}),
    pagination: true,
  });

  return {
    items: Array.isArray(response.data?.items) ? response.data.items : [],
    nextCursor: response.data?.nextCursor || null,
    hasMore: Boolean(response.data?.hasMore),
    total: Number(response.data?.total || 0),
  } as SupportChatHistoryPage;
};

export const getSupportChatMessages = async (payload: { chatId: string; guestToken?: string }) => {
  const response = await instance.post<SupportMessage[]>("/support-chat/messages", payload);
  return Array.isArray(response.data) ? response.data : [];
};

export const sendSupportChatMessage = async (payload: { chatId: string; message: string; guestToken?: string }) => {
  const response = await instance.post<SupportMessage>("/support-chat/send", payload);
  return response.data;
};

export const mergeGuestSupportChat = async (payload?: { chatId?: string; guestToken?: string }) => {
  const response = await instance.post<{ mergedCount: number; chatId?: string }>("/support-chat/merge", payload || {});
  return response.data;
};
