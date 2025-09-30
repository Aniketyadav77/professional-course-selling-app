const  jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// jwt secret 
const JWT_SECRET = process.env.JWT_SECRET || ' your-secret-key' ;


// generate jwt token by signing 

function generateToken(payload){
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'});

}

// hashing password function for security 

async function hashpassword(password){
    const saltRounds =10 ;
    return await bcrypt.hash(password, saltRounds);

}
//compare password
  async function comparepassword(password, hashedpassword){

    return await bcrypt.compare(password, hashedpassword);
}





// HELPER FUNCTION FOR EXTRACTING TOKEN ONLY 

function extractToken(req){
    const authHeader = req.header.autherization;
    if (!authHeader || !authHeader.stratsWith("Bearer ")){
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
            id: decoded.id, 
            role: decoded.role
        } ;
        next();

    }  catch (error){
        if(error.name=== "TokenExpeiedErrror")  {
            return res.status(401).json({message : "token expired"});
        }
            return res.status(401).json({ message: "Invalid token "     }) ;
        }
 }
    


// ADM9N AUTHENTICATE MIDDELWARE 
function authenticateAdmin(req, res, next) {
    const token = extractToken(req);



     if (!token){
        return res.status(401).json({
            message: "access denied. no token provided "
        });
    
     }
}


 try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role!=="admin"){
        return res.status(401).json({ message: "forbidden admins access only"});

    }
    req.admin = {
        id : decoded.id,
         role: decoded.role
    };
    next();
    
 }
catch (error)
{
if (error.name== "TOkenExpiredError"){
    return res.status(401).json({message: "Token expired ."});

}
return res.status(401).json({message: "Invalid token "});

}


module.exports = {
    generateToken, 
    hashpassword, 
    comparepassword, 
    authenticateUser,
    authenticateAdmin
};