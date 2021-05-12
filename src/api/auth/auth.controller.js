import AuthService from "./auth.service";
import {HTTP_STATUS} from "../../utils/http";
import logger from "../../utils/logger";
import passport from "passport";

const adminRegister = async (req, res) => {
    logger.info('auth.controller.js createAdmin(): ' + JSON.parse(req.body));
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
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })(req, res, next);
};

const adminLogout = async (req, res) => {
    req.logout();
    res.redirect("/");
};

export default {
    adminRegister,
    adminLogin,
    adminLogout
};
