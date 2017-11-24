// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class UpdateUserInfoPacket implements Packet
{
    name = 'UpdateUserInfo';
    flags = MessageFlags.FrequencyLow;
    id = 4294902161;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    UserData: {
        IMViaEMail: boolean;
        DirectoryVisibility: string;
    };

    getSize(): number
    {
        return (this.UserData['DirectoryVisibility'].length + 1) + 33;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt8((this.UserData['IMViaEMail']) ? 1 : 0, pos++);
         buf.write(this.UserData['DirectoryVisibility'], pos);
         pos += this.UserData['DirectoryVisibility'].length;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             SessionID: UUID
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero()
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         this.AgentData = newObjAgentData;
         const newObjUserData: {
             IMViaEMail: boolean,
             DirectoryVisibility: string
         } = {
             IMViaEMail: false,
             DirectoryVisibility: ''
         };
         newObjUserData['IMViaEMail'] = (buf.readUInt8(pos++) === 1);
         newObjUserData['DirectoryVisibility'] = buf.toString('utf8', pos, length);
         pos += length;
         this.UserData = newObjUserData;
         return pos - startPos;
     }
}

