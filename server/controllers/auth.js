


function newAccessToken() {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.send(403);
        const accessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken: accessToken })
    })
}