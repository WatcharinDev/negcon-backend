import * as bcrypt from 'bcrypt';

export const encodePassword = async (rawPassword: string) => {
    const salt = bcrypt.genSaltSync()
    return  await bcrypt.hashSync(rawPassword, salt)
}


export const decodePassword = async (rawPassword: string, dbPassword: string) => {
    return await bcrypt.compare(rawPassword, dbPassword)
};