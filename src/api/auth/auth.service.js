import User from "./user.model";

/**
 * Create admin in db
 * @param username
 * @param email
 * @returns {Promise<Document<any>>}
 */

const createAdmin = ({
                         username,
                         email
                     }) => {
    const user = new User({
        username,
        email
    });

    return user.save();
};

export default {
    createAdmin
};
