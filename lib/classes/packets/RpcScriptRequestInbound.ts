// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RpcScriptRequestInboundPacket implements Packet
{
    name = 'RpcScriptRequestInbound';
    flags = MessageFlags.FrequencyLow;
    id = 4294902175;

    TargetBlock: {
        GridX: number;
        GridY: number;
    };
    DataBlock: {
        TaskID: UUID;
        ItemID: UUID;
        ChannelID: UUID;
        IntValue: number;
        StringValue: string;
    };

    getSize(): number
    {
        return (this.DataBlock['StringValue'].length + 2) + 60;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         buf.writeUInt32LE(this.TargetBlock['GridX'], pos);
         pos += 4;
         buf.writeUInt32LE(this.TargetBlock['GridY'], pos);
         pos += 4;
         this.DataBlock['TaskID'].writeToBuffer(buf, pos);
         pos += 16;
         this.DataBlock['ItemID'].writeToBuffer(buf, pos);
         pos += 16;
         this.DataBlock['ChannelID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt32LE(this.DataBlock['IntValue'], pos);
         pos += 4;
         buf.write(this.DataBlock['StringValue'], pos);
         pos += this.DataBlock['StringValue'].length;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjTargetBlock: {
             GridX: number,
             GridY: number
         } = {
             GridX: 0,
             GridY: 0
         };
         newObjTargetBlock['GridX'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjTargetBlock['GridY'] = buf.readUInt32LE(pos);
         pos += 4;
         this.TargetBlock = newObjTargetBlock;
         const newObjDataBlock: {
             TaskID: UUID,
             ItemID: UUID,
             ChannelID: UUID,
             IntValue: number,
             StringValue: string
         } = {
             TaskID: UUID.zero(),
             ItemID: UUID.zero(),
             ChannelID: UUID.zero(),
             IntValue: 0,
             StringValue: ''
         };
         newObjDataBlock['TaskID'] = new UUID(buf, pos);
         pos += 16;
         newObjDataBlock['ItemID'] = new UUID(buf, pos);
         pos += 16;
         newObjDataBlock['ChannelID'] = new UUID(buf, pos);
         pos += 16;
         newObjDataBlock['IntValue'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjDataBlock['StringValue'] = buf.toString('utf8', pos, length);
         pos += length;
         this.DataBlock = newObjDataBlock;
         return pos - startPos;
     }
}

