import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const secret = 'thisissupposedtobesecret'

export const signIn = async (req, res) => {
    const {  username, password } = req.body
    try{
        const oldUser = await findOne({username})
        if (!oldUser) return res.status(404).json({message: "User not found"})
        const correctPassword = await bcrypt.compare(password, oldUser.password)
        if (!correctPassword) return res.status(400).json({message: "Wrong password entered"})
        const token = jwt.sign({username, id: oldUser._id}, secret, {expiresIn:'1h'})
        res.status(200).json({result: oldUser, token} )
    } catch (error) {
        res.status(500).json({message: error})
    }
}