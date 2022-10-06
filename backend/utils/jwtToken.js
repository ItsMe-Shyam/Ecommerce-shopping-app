
// Creating token and storing it in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    const options = {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000 // here the 'expires' have to be in miliseconds
                                                             //  so we are converting the COOKIE_EXPIRE to miliseconds as it is in days 
        )
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
};

module.exports = sendToken;