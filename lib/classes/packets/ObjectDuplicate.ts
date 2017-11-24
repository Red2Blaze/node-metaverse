// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectDuplicatePacket implements Packet
{
    name = 'ObjectDuplicate';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901850;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        GroupID: UUID;
    };
    SharedData: {
        Offset: Vector3;
        DuplicateFlags: number;
    };
    ObjectData: {
        ObjectLocalID: number;
    }[];

    getSize(): number
    {
        return ((4) * this.ObjectData.length) + 65;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['GroupID'].writeToBuffer(buf, pos);
         pos += 16;
         this.SharedData['Offset'].writeToBuffer(buf, pos, false);
         pos += 12;
         buf.writeUInt32LE(this.SharedData['DuplicateFlags'], pos);
         pos += 4;
         const count = this.ObjectData.length;
         buf.writeUInt8(this.ObjectData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             buf.writeUInt32LE(this.ObjectData[i]['ObjectLocalID'], pos);
             pos += 4;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             SessionID: UUID,
             GroupID: UUID
         } = {
             AgentID: UUID.zero(),
             SessionID: UUID.zero(),
             GroupID: UUID.zero()
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['SessionID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['GroupID'] = new UUID(buf, pos);
         pos += 16;
         this.AgentData = newObjAgentData;
         const newObjSharedData: {
             Offset: Vector3,
             DuplicateFlags: number
         } = {
             Offset: Vector3.getZero(),
             DuplicateFlags: 0
         };
         newObjSharedData['Offset'] = new Vector3(buf, pos, false);
         pos += 12;
         newObjSharedData['DuplicateFlags'] = buf.readUInt32LE(pos);
         pos += 4;
         this.SharedData = newObjSharedData;
         const count = buf.readUInt8(pos++);
         this.ObjectData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjObjectData: {
                 ObjectLocalID: number
             } = {
                 ObjectLocalID: 0
             };
             newObjObjectData['ObjectLocalID'] = buf.readUInt32LE(pos);
             pos += 4;
             this.ObjectData.push(newObjObjectData);
         }
         return pos - startPos;
     }
}

