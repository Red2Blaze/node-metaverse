// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class UpdateMuteListEntryPacket implements Packet
{
    name = 'UpdateMuteListEntry';
    flags = MessageFlags.FrequencyLow;
    id = 4294902023;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    MuteData: {
        MuteID: UUID;
        MuteName: string;
        MuteType: number;
        MuteFlags: number;
    };

    getSize(): number
    {
        return (this.MuteData['MuteName'].length + 1) + 56;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         this.MuteData['MuteID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.write(this.MuteData['MuteName'], pos);
         pos += this.MuteData['MuteName'].length;
         buf.writeInt32LE(this.MuteData['MuteType'], pos);
         pos += 4;
         buf.writeUInt32LE(this.MuteData['MuteFlags'], pos);
         pos += 4;
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
         const newObjMuteData: {
             MuteID: UUID,
             MuteName: string,
             MuteType: number,
             MuteFlags: number
         } = {
             MuteID: UUID.zero(),
             MuteName: '',
             MuteType: 0,
             MuteFlags: 0
         };
         newObjMuteData['MuteID'] = new UUID(buf, pos);
         pos += 16;
         newObjMuteData['MuteName'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjMuteData['MuteType'] = buf.readInt32LE(pos);
         pos += 4;
         newObjMuteData['MuteFlags'] = buf.readUInt32LE(pos);
         pos += 4;
         this.MuteData = newObjMuteData;
         return pos - startPos;
     }
}

