import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    const user = await usersRepository.findOne({email})

    if(!user) throw new Error("Email/Password incorrect")

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) throw new Error("Email/Password incorrect!")

    const token = sign(
      {
        email: user.email,
      },
      '55c9ab430c48e66d1bf4fcd7f937470b',
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    return token
  }
}


export {AuthenticateUserService}
