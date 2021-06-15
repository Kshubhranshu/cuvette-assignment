"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createResponse(request, { value = null, boom = null }) {
    const errors = [];
    let data = [];
    if (boom) {
        errors.push({
            code: boom.output.payload.statusCode,
            error: boom.output.payload.error,
            message: boom.output.payload.message,
        });
    }
    if (value && data) {
        if (Array.isArray(value)) {
            data.push(...value);
        }
        else {
            data.push(value);
            data = value;
        }
    }
    return {
        meta: {
            method: request.method.toUpperCase(),
            operation: request.url.pathname,
            paging: null,
        },
        data,
        errors,
    };
}
exports.default = createResponse;
