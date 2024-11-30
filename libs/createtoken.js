import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function createToken(payload) {
    console.log({ secret: process.env.SECRET, payload });
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET, (err, token) => {
            if (err) {
                console.log({ err });
                return reject(err); // Rechaza la promesa en caso de error
            }
            console.log({ token });
            return resolve(token); // Resuelve la promesa con el token
        });
    });
}
