import jwt from 'jsonwebtoken'
export default async function createToken(data) {
    const token = await jwt.sign(data,process.env.JWT_SECRET,{
        expiresIn : '7d' })
        return token
}