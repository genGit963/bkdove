import * as jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) =>{
  
  const token = req.cookies.access_token;
  if(!token) return res.status(401, "You aren't authenticated . !!");

  jwt.verify(token, process.env.JWT_KEY, (err, user) =>{
    if (err) return next(createError(403, "Token is invalid"));
    req.user = user;
    next();
  })  
}