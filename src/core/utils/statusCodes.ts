const HttpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    NOT_WHITELISTED: 409,
    UNPROCESSABLE: 422,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export default HttpStatus;