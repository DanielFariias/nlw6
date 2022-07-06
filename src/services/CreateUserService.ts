import { hash } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
  name: string
  email:string
  password:string
  isAdmin?: boolean
}

class CreateUserService {
  async execute({name, email,password, isAdmin = false}:IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    if(!email) throw new Error("Email incorrect!")

    const userAlreadyExists = await usersRepository.findOne({ email })

    if(userAlreadyExists) throw new Error("User already exists!")

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin: isAdmin
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserService }
