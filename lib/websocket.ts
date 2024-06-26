import throttle from "lodash.throttle";

export interface ConfigProps {
  url: string;
  onMessage?: (data: MessageEvent) => void;
  onOpen?: (data: Event) => void;
  onClose?: (data: CloseEvent) => void;
  onError?: (data: Event) => void;
  onReconnect?: (data: any) => void;
  onOffline?: (data: any) => void;
  sendPing?: (() => void) | null;
  /** 心跳间隔 */
  interval?: number;
  /** 重连次数 */
  reconnect?: number;
  /** 页面被激活时再触发重连，重连次数设置为无限后才生效 */
  reconnectOnVisibility?: boolean;
  /** 重连事件发生之后等待恢复的超时时间，默认500ms  */
  retryEventTimeout?: number;
}

export default class BaseSocket {
  url: string;
  websocket: WebSocket;
  heartbeat?: NodeJS.Timeout; // 心跳
  count: number; // 重连计数器
  reconnect: number; // 重连次数
  interval = 1000; // 心跳间隔
  connectLock = false; // 是否正在重连中
  reconnectOnVisibility = true; // 页面被激活时再触发重连
  isWindowActive = true; // 页面是否被激活中
  disposed = false; // ws是否被销毁
  retryEventTimeout = 500;
  onMessage?: (data: MessageEvent) => void;
  onOpen?: (data: Event) => void;
  onClose?: (data: CloseEvent) => void;
  onError?: (data: Event) => void;
  onReconnect?: (data: Event) => void;
  onOffline?: (data: Event) => void;
  sendPing?: (() => void) | null;
  resendData?: any; // 重连成功后需要重发的数据
  beforeUnloadEventCallback?: () => void;
  offlineEventCallback?: (data: Event) => void;
  visibilitychangeEventCallback?: () => void;
  constructor(configs: ConfigProps) {
    this.url = configs.url;
    this.websocket = new WebSocket(this.url);
    this.count = 0;
    this.interval = configs.interval || 1000;
    this.reconnect = configs.reconnect || 3;
    this.reconnectOnVisibility = configs.reconnectOnVisibility || true;
    this.retryEventTimeout = configs.retryEventTimeout || 500;
    this.initWebSocket(configs);
  }
  get isConnected() {
    return this.websocket.readyState === WebSocket.OPEN;
  }
  get isClosed() {
    return this.websocket.readyState === WebSocket.CLOSED;
  }
  initWebSocket({
    onMessage,
    onOpen,
    onClose,
    onError,
    sendPing = () => {
      this.sendMessage({ serviceType: "SERVICE_HEARTBREAK", time: Date.now() });
    },
    onReconnect = () => {
      console.warn(
        `websocket reconnecting successfully, 时间戳：${Date.now()}, 时间：${Date()}`
      );
    },
    onOffline = () => {
      console.error(`已断网`);
    },
  }: ConfigProps) {
    this.onMessage = onMessage;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onError = onError;
    this.sendPing = sendPing;
    this.onReconnect = onReconnect;
    this.onOffline = onOffline;
    this.websocket.onopen = (Event) => {
      if (this.count) {
        console.log(`断线重连${this.count}次，重连成功`);
        this.onReconnect && this.onReconnect(Event);
      }
      this.count = 0;
      this.onOpen && this.onOpen(Event);
      if (this.sendPing) {
        this.removePing();
        this.heartbeat = setInterval(this.sendPing, this.interval);
      }
    };
    this.websocket.onmessage = (MessageEvent) => {
      this.onMessage && this.onMessage(MessageEvent);
    };
    this.websocket.onclose = (CloseEvent) => {
      this.onClose && this.onClose(CloseEvent);
      this.removePing();
      if (this.reconnect && !this.connectLock) {
        this.connectLock = true;
        this.reconnectWebSocket();
      }
    };
    this.websocket.onerror = (ErrorEvent) => {
      this.onError && this.onError(ErrorEvent);
      if (this.reconnect && !this.connectLock) {
        this.connectLock = true;
        this.reconnectWebSocket();
      }
    };
    // 离开页面，不再重连
    this.beforeUnloadEventCallback = () => this.closeWebsocket();
    this.offlineEventCallback = (data: Event) => this.handleOffline(data);
    window.addEventListener("beforeunload", this.beforeUnloadEventCallback);
    window.addEventListener("offline", this.offlineEventCallback);
    this.listenOnVisibility();
  }
  sendMessage(data: any) {
    this.isConnected && this.websocket.send(JSON.stringify(data));
    if (this.isClosed && this.reconnect && !this.connectLock) {
      this.connectLock = true;
      this.resendData = data;
      this.reconnectWebSocket();
    }
  }
  removePing() {
    this.heartbeat && clearInterval(this.heartbeat);
  }
  handleOffline(data: Event) {
    this.onOffline && this.onOffline(data);
  }
  closeWebsocket() {
    this.count = 0;
    this.reconnect = 0;
    this.disposed = true;
    this.websocket.close();
    this.removePing();
    window.removeEventListener("beforeunload ", this.beforeUnloadEventCallback);
    window.removeEventListener("offline", this.offlineEventCallback);
    this.beforeUnloadEventCallback = null;
    this.offlineEventCallback = null;
  }
  onVisibility() {
    this.isWindowActive = document.visibilityState === "visible";
    // 当页面激活时候，ws未被主动销毁，并且处于断连状态时候，执行重连
    if (!this.disposed && this.isWindowActive && this.isClosed) {
      this.reconnectWebSocket();
    }
  }
  listenOnVisibility() {
    if (!this.reconnectOnVisibility) {
      return;
    }

    document.removeEventListener(
      "visibilitychange",
      this.visibilitychangeEventCallback
    );
    this.visibilitychangeEventCallback = () => this.onVisibility();
    document.addEventListener(
      "visibilitychange",
      this.visibilitychangeEventCallback
    );
  }
  reconnectWebSocket = throttle(() => {
    if (this.reconnectOnVisibility && !this.isWindowActive) {
      return;
    }
    if (this.count > this.reconnect) {
      console.log(
        `重连发起${this.count - 1}次，等待 ${
          this.count * this.interval
        }ms 之后网络仍未恢复, 时间戳：${Date.now()}, 时间：${Date()}`
      );
      return;
    }
    this.count++;
    this.websocket = new WebSocket(this.url);
    this.initWebSocket({
      url: this.url,
      onMessage: this.onMessage,
      onOpen: this.onOpen,
      onClose: this.onClose,
      onError: this.onError,
      onReconnect: this.onReconnect,
      onOffline: this.onOffline,
      sendPing: this.sendPing,
    });
    this.connectLock = false;
    if (this.resendData) {
      setTimeout(() => {
        if (this.isConnected) {
          this.websocket.send(JSON.stringify(this.resendData));
          this.resendData = null;
        } else {
          console.error(
            `重连等待 ${
              this.retryEventTimeout
            }ms 之后仍未成功，数据未能发送, 时间戳：${Date.now()}`
          );
        }
      }, this.retryEventTimeout);
    }
  }, this.interval);
}
