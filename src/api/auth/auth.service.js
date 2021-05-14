import User from "./user.model";

/**
 * Create admin in db
 * @param username
 * @param email
 * @param password
 * @returns {Promise<Document<any>>}
 */

const createAdmin = ({
                         username,
                         email,
                         password
                     }) => {
    const user = new User({
        username,
        email,
        password
    });

    return user.save();
};

export default {
    createAdmin
};
