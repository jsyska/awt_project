import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.headers.authorization?.split(" ")[1] as string;
        if (!token) return res.status(403).json({ errorMessages: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.user = decoded;
        next();
        
    } catch (err: any) {
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).json({ errorMessages: "Token has expired" });
          } else if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ errorMessages: "Invalid token" });
          } else {
            res.status(500).json({ errorMessages: err.message });
          }
    }
}