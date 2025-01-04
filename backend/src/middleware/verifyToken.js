import jwt from 'jsonwebtoken'
export const JWT_SECRET = process.env.JWT_SECRET_KEY

export const verifyToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (!token) return response.status(401).send("Access Denied: No Token Provided!");

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return response.status(403).send("Invalid Token!");
        request.user = user; 
        next();
    });
};

export const verifySocketToken = (socket, next) => {
    const token = socket.handshake.auth.token; // Get token from handshake

    if (!token) {
        return next(new Error("Access Denied: No Token Provided!")); // Reject connection
    }

    try {
        // Verify token and attach user data
        const user = jwt.verify(token, JWT_SECRET);
        socket.user = user; // Attach user to socket (similar to request.user in Express)
        next(); // Allow connection
    } catch (error) {
        console.log("Socket Authentication Error:", error.message);
        return next(new Error("Invalid Token!")); // Reject connection
    }
};