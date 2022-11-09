async function userDataByUsername(username) {
    const user_data = await User.findOne({
        username: username
    });
    return user_data
};

async function userDataById(id) {
    const user_data = await User.findOne({
        _id: id
    });
    return user_data
}