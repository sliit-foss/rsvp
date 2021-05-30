import AuthService from "./auth.service";
import {HTTP_STATUS} from "../../utils/http";
import logger from "../../utils/logger";
import passport from "passport";

const adminRegister = async (req, res) => {
    try {
        const admin = await AuthService.createAdmin(req.body);
        return res.status(HTTP_STATUS.CREATED).json(admin);
    } catch (err) {
        logger.error('auth.controller.js createAdmin(): ' + err.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: err.message
        });
    }
};

const adminLogin = async (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: err.message
            });
        }
        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: 'Invalid username or password'
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            message: 'Authentication successful'
        }).cookie("isAuthenticated", req.isAuthenticated());
    })(req, res, next);
};

const adminLogout = async (req, res) => {
    req.logout();
};

export default {
    adminRegister,
    adminLogin,
    adminLogout
};
