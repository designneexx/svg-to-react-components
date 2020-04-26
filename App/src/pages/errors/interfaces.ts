export interface ErrorI {
  statusCode: number;
  message: string;
}

export type ErrorStatusT = ErrorI | null;
export type HandleErrorI = (error: ErrorStatusT | ((error: ErrorStatusT) => ErrorStatusT)) => void;

export interface PageErrorProps extends ErrorI {
  handlePageError: HandleErrorI;
}
