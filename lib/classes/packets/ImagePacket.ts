// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ImagePacketPacket implements Packet
{
    name = 'ImagePacket';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyHigh;
    id = 10;

    ImageID: {
        ID: UUID;
        Packet: number;
    };
    ImageData: {
        Data: string;
    };

    getSize(): number
    {
        return (this.ImageData['Data'].length + 2) + 18;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.ImageID['ID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt16LE(this.ImageID['Packet'], pos);
         pos += 2;
         buf.write(this.ImageData['Data'], pos);
         pos += this.ImageData['Data'].length;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjImageID: {
             ID: UUID,
             Packet: number
         } = {
             ID: UUID.zero(),
             Packet: 0
         };
         newObjImageID['ID'] = new UUID(buf, pos);
         pos += 16;
         newObjImageID['Packet'] = buf.readUInt16LE(pos);
         pos += 2;
         this.ImageID = newObjImageID;
         const newObjImageData: {
             Data: string
         } = {
             Data: ''
         };
         newObjImageData['Data'] = buf.toString('utf8', pos, length);
         pos += length;
         this.ImageData = newObjImageData;
         return pos - startPos;
     }
}

