// This file has been automatically generated by writePacketClasses.js

import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class PacketAckPacket implements Packet
{
    name = 'PacketAck';
    flags = MessageFlags.FrequencyFixed;
    id = 4294967291;

    Packets: {
        ID: number;
    }[];

    getSize(): number
    {
        return ((4) * this.Packets.length) + 1;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const count = this.Packets.length;
         buf.writeUInt8(this.Packets.length, pos++);
         for (let i = 0; i < count; i++)
         {
             buf.writeUInt32LE(this.Packets[i]['ID'], pos);
             pos += 4;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const count = buf.readUInt8(pos++);
         this.Packets = [];
         for (let i = 0; i < count; i++)
         {
             const newObjPackets: {
                 ID: number
             } = {
                 ID: 0
             };
             newObjPackets['ID'] = buf.readUInt32LE(pos);
             pos += 4;
             this.Packets.push(newObjPackets);
         }
         return pos - startPos;
     }
}

