import { HTTP_STATUS } from "../utils/http";
import { errorResponse } from "../utils/response";

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => errorResponse(res, err, HTTP_STATUS.INTERNAL_SERVER_ERROR))
}

export default asyncHandler
