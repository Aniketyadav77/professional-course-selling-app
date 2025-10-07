const  jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// jwt secret 
const JWT_SECRET = process.env.JWT_SECRET || ' your-secret-key' ;


// generate jwt token by signing 

function generateToken(payload){
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'});

}

// hashing password function for security 

async function hashPassword(password){
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

//compare password
async function comparePassword(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}





// HELPER FUNCTION FOR EXTRACTING TOKEN ONLY 

function extractToken(req){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return null;
    }
    return authHeader.split(" ")[1];
}

// user auth middleware 

function authenticateUser(req, res, next) {
    const  token = extractToken(req);
    if (!token) {
        return res.status(401).json ({
            message: "Access denied. no token provided ."
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            type: decoded.type
        };
        next();
    } catch (error){
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({message: "Token expired"});
        }
        return res.status(401).json({ message: "Invalid token" });
    }
}
    


// ADMIN AUTHENTICATE MIDDLEWARE 
function authenticateAdmin(req, res, next) {
    const token = extractToken(req);

    if (!token){
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = {
            adminId: decoded.adminId,
            email: decoded.email,
            type: decoded.type
        };
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Token expired."});
        }
        return res.status(401).json({message: "Invalid token"});
    }
}


module.exports = {
    generateToken, 
    hashPassword, 
    comparePassword, 
    authenticateUser,
    authenticateAdmin
};