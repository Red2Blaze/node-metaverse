// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class DirPlacesReplyPacket implements Packet
{
    name = 'DirPlacesReply';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901795;

    AgentData: {
        AgentID: UUID;
    };
    QueryData: {
        QueryID: UUID;
    }[];
    QueryReplies: {
        ParcelID: UUID;
        Name: string;
        ForSale: boolean;
        Auction: boolean;
        Dwell: number;
    }[];
    StatusData: {
        Status: number;
    }[];

    getSize(): number
    {
        return ((16) * this.QueryData.length) + ((this.calculateVarVarSize(this.QueryReplies, 'Name', 1) + 22) * this.QueryReplies.length) + ((4) * this.StatusData.length) + 19;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         let count = this.QueryData.length;
         buf.writeUInt8(this.QueryData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.QueryData[i]['QueryID'].writeToBuffer(buf, pos);
             pos += 16;
         }
         count = this.QueryReplies.length;
         buf.writeUInt8(this.QueryReplies.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.QueryReplies[i]['ParcelID'].writeToBuffer(buf, pos);
             pos += 16;
             buf.write(this.QueryReplies[i]['Name'], pos);
             pos += this.QueryReplies[i]['Name'].length;
             buf.writeUInt8((this.QueryReplies[i]['ForSale']) ? 1 : 0, pos++);
             buf.writeUInt8((this.QueryReplies[i]['Auction']) ? 1 : 0, pos++);
             buf.writeFloatLE(this.QueryReplies[i]['Dwell'], pos);
             pos += 4;
         }
         count = this.StatusData.length;
         buf.writeUInt8(this.StatusData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             buf.writeUInt32LE(this.StatusData[i]['Status'], pos);
             pos += 4;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID
         } = {
             AgentID: UUID.zero()
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         this.AgentData = newObjAgentData;
         let count = buf.readUInt8(pos++);
         this.QueryData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjQueryData: {
                 QueryID: UUID
             } = {
                 QueryID: UUID.zero()
             };
             newObjQueryData['QueryID'] = new UUID(buf, pos);
             pos += 16;
             this.QueryData.push(newObjQueryData);
         }
         count = buf.readUInt8(pos++);
         this.QueryReplies = [];
         for (let i = 0; i < count; i++)
         {
             const newObjQueryReplies: {
                 ParcelID: UUID,
                 Name: string,
                 ForSale: boolean,
                 Auction: boolean,
                 Dwell: number
             } = {
                 ParcelID: UUID.zero(),
                 Name: '',
                 ForSale: false,
                 Auction: false,
                 Dwell: 0
             };
             newObjQueryReplies['ParcelID'] = new UUID(buf, pos);
             pos += 16;
             newObjQueryReplies['Name'] = buf.toString('utf8', pos, length);
             pos += length;
             newObjQueryReplies['ForSale'] = (buf.readUInt8(pos++) === 1);
             newObjQueryReplies['Auction'] = (buf.readUInt8(pos++) === 1);
             newObjQueryReplies['Dwell'] = buf.readFloatLE(pos);
             pos += 4;
             this.QueryReplies.push(newObjQueryReplies);
         }
         count = buf.readUInt8(pos++);
         this.StatusData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjStatusData: {
                 Status: number
             } = {
                 Status: 0
             };
             newObjStatusData['Status'] = buf.readUInt32LE(pos);
             pos += 4;
             this.StatusData.push(newObjStatusData);
         }
         return pos - startPos;
     }
}

