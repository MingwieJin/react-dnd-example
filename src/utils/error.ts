import { CustomError } from './request';

//
interface RequestErrorProps extends CustomError {
  url: string;
  traceId?: string;
  userId?: number;
  role?: string;
}

export class RequestError extends Error {
  /**
   * 请求地址
   */
  readonly url: string;

  /**
   * 状态码
   */
  readonly code: number;

  readonly _traceId?: string;

  readonly userId?: number;

  readonly date: Date;

  readonly role?: string;

  constructor(props: RequestErrorProps) {
    super();
    // 对用户隐藏错误
    Error.captureStackTrace && Error.captureStackTrace(this, RequestError);
    const { code, message, url, traceId, userId, role } = props;
    this.name = 'Request Error';

    // 自定义调试信息
    this.code = code;
    this.message = message;
    this.url = url;
    this._traceId = traceId;
    this.userId = userId;
    this.date = new Date();
    this.role = role;
  }
}
