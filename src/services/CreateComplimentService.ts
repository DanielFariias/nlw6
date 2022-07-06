import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({tag_id, user_receiver, user_sender, message}:IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
    const userRepositories = getCustomRepository(UsersRepositories)

    if(user_receiver === user_sender) throw new Error("Incorrect User Receiver!")

    const userReceiverExists = await userRepositories.findOne(user_receiver)

    if(!userReceiverExists) throw new Error("User Receiver does not exists!")

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    })

    complimentsRepositories.save(compliment)

    return compliment

  }
}

export { CreateComplimentService }
