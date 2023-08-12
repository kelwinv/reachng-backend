import { Utils } from "Application/Utils";
import { UUIDGenerator } from "./UUIDGenerator";

class User {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly password: string,
        readonly isAdmin: boolean
    ){
        this.isEmailValidFormat(email);
        this.validate()
    }

    validate() {

        if (!this.name) throw new Error("Name cannot be empty");
        if (!this.password) throw new Error("Password cannot be empty");
    }

    isEmailValidFormat(value: string){
        if (!Utils.isEmailValidFormat(value)) throw new Error("User email is not in a valid format")

    }

    static create({name,email,password, isAdmin}: { name: string; email: string; password: string; isAdmin:boolean }) {
        const id = UUIDGenerator.create();
    
        return new User(id, name, email, password, isAdmin);
      }
}

export {User}