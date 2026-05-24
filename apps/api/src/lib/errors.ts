export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export const Unauthorized = (msg = 'Unauthorized') => new HttpError(401, msg);
export const NotFound = (msg = 'Not found') => new HttpError(404, msg);
export const BadRequest = (msg = 'Bad request') => new HttpError(400, msg);
export const Conflict = (msg = 'Conflict') => new HttpError(409, msg);
