// Base HTTP Exception class
export class HttpException extends Error {
  public status: number;
  public message: string;
  public details?: any;

  constructor(status: number, message: string, details?: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.details = details;
    
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 Bad Request
export class BadRequestException extends HttpException {
  constructor(message: string = "Bad Request", details?: any) {
    super(400, message, details);
  }
}

// 401 Unauthorized
export class UnauthorizedException extends HttpException {
  constructor(message: string = "Unauthorized", details?: any) {
    super(401, message, details);
  }
}

// 403 Forbidden
export class ForbiddenException extends HttpException {
  constructor(message: string = "Forbidden", details?: any) {
    super(403, message, details);
  }
}

// 404 Not Found
export class NotFoundException extends HttpException {
  constructor(message: string = "Not Found", details?: any) {
    super(404, message, details);
  }
}

// 409 Conflict
export class ConflictException extends HttpException {
  constructor(message: string = "Conflict", details?: any) {
    super(409, message, details);
  }
}

// 422 Unprocessable Entity
export class UnprocessableEntityException extends HttpException {
  constructor(message: string = "Unprocessable Entity", details?: any) {
    super(422, message, details);
  }
}

// 500 Internal Server Error
export class InternalServerErrorException extends HttpException {
  constructor(message: string = "Internal Server Error", details?: any) {
    super(500, message, details);
  }
}

// Database exceptions
export class DatabaseException extends HttpException {
  constructor(message: string = "Database Error", details?: any) {
    super(500, message, details);
  }
}

// Validation exceptions
export class ValidationException extends HttpException {
  constructor(message: string = "Validation Error", details?: any) {
    super(400, message, details);
  }
}

// Business logic exceptions
export class BusinessLogicException extends HttpException {
  constructor(message: string, status: number = 400, details?: any) {
    super(status, message, details);
  }
}

// Rate limiting exceptions
export class TooManyRequestsException extends HttpException {
  constructor(message: string = "Too Many Requests", details?: any) {
    super(429, message, details);
  }
}

// Service unavailable
export class ServiceUnavailableException extends HttpException {
  constructor(message: string = "Service Unavailable", details?: any) {
    super(503, message, details);
  }
}
