import {HTTP_STATUS} from "../../utils/http";
import logger from "../../utils/logger";
import nodemailer from "nodemailer";
import ClientConst from "./mail.constants";


/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const sendMail = async (req, res) => {
    logger.info('mail.controller.js sendMail(): ' + JSON.parse(req.body));
    try {

        let Recivers = req.body.recivers;
        let Subject =  req.body.subject;
        let Text = req.body.text;
        let Html = req.body.html;

        const mailresults = await ExecuteMail(Recivers,Subject,Text,Html);
        return res.status(HTTP_STATUS.OK).json(mailresults);


    } catch (err) {
        logger.error('mail.controller.js sendMail(): ' + err.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: err.message
        });
    }
};

const ExecuteMail = async (rec, sub, txt,html) =>{

    try {

        
    var transport = nodemailer.createTransport({
        host: ClientConst.CREDENTIALS.HOST,
        port: ClientConst.CREDENTIALS.PORT,
        auth: {
          user: ClientConst.CREDENTIALS.USER, 
          pass: ClientConst.CREDENTIALS.PASSWORD 
        }
      });

    var mailOptions = {
        from: ClientConst.CREDENTIALS.USER,
        to: rec,
        subject: sub,
        text: txt, 
        html: html
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {

          logger.error('mail.controller.js ExecuteMail(): ' + error.message);
          return {"success": false, "messageid" : "" , "error" : error.message  };
        }

        logger.info('Message sent: %s', info.messageId);
        return {"success": true, "messageid" : info.messageId , "error" : ""  };
        
      });
        
    } catch (error) {

        logger.error('mail.controller.js ExecuteMail(): ' + error);
        return {"success": false, "messageid" : "" , "error" : error  };
        
    }

   

};


export default {
    sendMail
};
