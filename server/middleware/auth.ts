import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.headers.authorization?.split(" ")[1] as string;
        if (!token) return res.status(403).json({ errorMessages: "Unauthorized" });

        if (token.startsWith("Bearer ")) {
            const tokenValue = token.slice(7, token.length).trimStart();
            const decoded: string | JwtPayload = jwt.verify(tokenValue, process.env.JWT_SECRET as string);
            req.body.user = decoded;
            next();
        }
    } catch (err: any) {
        res.status(500).json({ errorMessages: err.message });
    }
}