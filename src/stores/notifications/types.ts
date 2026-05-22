export interface NotificationsState {
  count: number;
  isLoading: boolean;
  error: string | null;
}

export interface NotificationsActions {
  fetchCount: () => Promise<void>;
  reset: () => void;
}

export type NotificationsStore = NotificationsState & NotificationsActions;
