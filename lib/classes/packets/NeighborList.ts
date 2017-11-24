// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {IPAddress} from '../IPAddress';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class NeighborListPacket implements Packet
{
    name = 'NeighborList';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyHigh;
    id = 3;

    NeighborBlock: {
        IP: IPAddress;
        Port: number;
        PublicIP: IPAddress;
        PublicPort: number;
        RegionID: UUID;
        Name: string;
        SimAccess: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.NeighborBlock, 'Name', 1)) * 4) + 116;
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
         const count = 4;
         for (let i = 0; i < count; i++)
         {
             this.NeighborBlock[i]['IP'].writeToBuffer(buf, pos);
             pos += 4;
             buf.writeUInt16LE(this.NeighborBlock[i]['Port'], pos);
             pos += 2;
             this.NeighborBlock[i]['PublicIP'].writeToBuffer(buf, pos);
             pos += 4;
             buf.writeUInt16LE(this.NeighborBlock[i]['PublicPort'], pos);
             pos += 2;
             this.NeighborBlock[i]['RegionID'].writeToBuffer(buf, pos);
             pos += 16;
             buf.write(this.NeighborBlock[i]['Name'], pos);
             pos += this.NeighborBlock[i]['Name'].length;
             buf.writeUInt8(this.NeighborBlock[i]['SimAccess'], pos++);
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const count = 4;
         this.NeighborBlock = [];         for (let i = 0; i < count; i++)
         {
             const newObjNeighborBlock: {
                 IP: IPAddress,
                 Port: number,
                 PublicIP: IPAddress,
                 PublicPort: number,
                 RegionID: UUID,
                 Name: string,
                 SimAccess: number
             } = {
                 IP: IPAddress.zero(),
                 Port: 0,
                 PublicIP: IPAddress.zero(),
                 PublicPort: 0,
                 RegionID: UUID.zero(),
                 Name: '',
                 SimAccess: 0
             };
             newObjNeighborBlock['IP'] = new IPAddress(buf, pos);
             pos += 4;
             newObjNeighborBlock['Port'] = buf.readUInt16LE(pos);
             pos += 2;
             newObjNeighborBlock['PublicIP'] = new IPAddress(buf, pos);
             pos += 4;
             newObjNeighborBlock['PublicPort'] = buf.readUInt16LE(pos);
             pos += 2;
             newObjNeighborBlock['RegionID'] = new UUID(buf, pos);
             pos += 16;
             newObjNeighborBlock['Name'] = buf.toString('utf8', pos, length);
             pos += length;
             newObjNeighborBlock['SimAccess'] = buf.readUInt8(pos++);
             this.NeighborBlock.push(newObjNeighborBlock);
         }
         return pos - startPos;
     }
}

