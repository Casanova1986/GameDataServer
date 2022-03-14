
import { UserModel,IUserDocument } from './Models/UserModel';
import { Socket } from "socket.io";

export class UserData {
    User: IUserDocument;
    socket: Socket;

    DeviceID:string;
    IPAddress:string;
    AppVersion: number;

    constructor(socket: Socket) {
        this.socket = socket;
    }

}