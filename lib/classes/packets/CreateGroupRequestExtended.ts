// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class CreateGroupRequestExtendedPacket implements Packet
{
    name = 'CreateGroupRequestExtended';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902189;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        GroupLimit: number;
    };
    GroupData: {
        Name: string;
        Charter: string;
        ShowInList: boolean;
        InsigniaID: UUID;
        MembershipFee: number;
        OpenEnrollment: boolean;
        AllowPublish: boolean;
        MaturePublish: boolean;
    };

    getSize(): number
    {
        return (this.GroupData['Name'].length + 1 + this.GroupData['Charter'].length + 2) + 60;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeInt32LE(this.AgentData['GroupLimit'], pos);
         pos += 4;
         buf.write(this.GroupData['Name'], pos);
         pos += this.GroupData['Name'].length;
         buf.write(this.GroupData['Charter'], pos);
         pos += this.GroupData['Charter'].length;
         buf.writeUInt8((this.GroupData['ShowInList']) ? 1 : 0, pos++);
         this.GroupData['InsigniaID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeInt32LE(this.GroupData['MembershipFee'], pos);
         pos += 4;
         buf.writeUInt8((this.GroupData['OpenEnrollment']) ? 1 : 0, pos++);
         buf.writeUInt8((this.GroupData['AllowPublish']) ? 1 : 0, pos++);
         buf.writeUInt8((this.GroupData['MaturePublish']) ? 1 : 0, pos++);
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             SessionID: UUID,
             GroupLimit: number
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero(),
             GroupLimit: 0
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['GroupLimit'] = buf.readInt32LE(pos);
         pos += 4;
         this.AgentData = newObjAgentData;
         const newObjGroupData: {
             Name: string,
             Charter: string,
             ShowInList: boolean,
             InsigniaID: UUID,
             MembershipFee: number,
             OpenEnrollment: boolean,
             AllowPublish: boolean,
             MaturePublish: boolean
         } = {
             Name: '',
             Charter: '',
             ShowInList: false,
             InsigniaID: UUID.zero(),
             MembershipFee: 0,
             OpenEnrollment: false,
             AllowPublish: false,
             MaturePublish: false
         };
         newObjGroupData['Name'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjGroupData['Charter'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjGroupData['ShowInList'] = (buf.readUInt8(pos++) === 1);
         newObjGroupData['InsigniaID'] = new UUID(buf, pos);
         pos += 16;
         newObjGroupData['MembershipFee'] = buf.readInt32LE(pos);
         pos += 4;
         newObjGroupData['OpenEnrollment'] = (buf.readUInt8(pos++) === 1);
         newObjGroupData['AllowPublish'] = (buf.readUInt8(pos++) === 1);
         newObjGroupData['MaturePublish'] = (buf.readUInt8(pos++) === 1);
         this.GroupData = newObjGroupData;
         return pos - startPos;
     }
}

