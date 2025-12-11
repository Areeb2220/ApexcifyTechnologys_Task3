const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_super_secret';


module.exports = function (requiredRoles = []) {
    return (req, res, next) => {
        const header = req.headers.authorization;
        if (!header) return res.status(401).json({ message: 'No token provided' });
        const token = header.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Invalid token format' });


        try {
            const payload = jwt.verify(token, JWT_SECRET);
            req.user = payload; // { id, role }
            if (requiredRoles.length && !requiredRoles.includes(payload.role)) {
                return res.status(403).json({ message: 'Forbidden - insufficient role' });
            }
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token invalid or expired' });
        }
    };
};