import jwt from 'jsonwebtoken'
export const JWT_SECRET = process.env.JWT_SECRET_KEY

export const verifyToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return response.status(401).send("Access Denied: No Token Provided!");

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return response.status(403).send("Invalid Token!");
        request.user = user; 
        next();
    });
};