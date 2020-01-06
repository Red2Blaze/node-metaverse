// This file has been automatically generated by writeMessageClasses.js

import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class EdgeDataPacketMessage implements MessageBase
{
    name = 'EdgeDataPacket';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyHigh;
    id = Message.EdgeDataPacket;

    EdgeData: {
        LayerType: number;
        Direction: number;
        LayerData: Buffer;
    };

    getSize(): number
    {
        return (this.EdgeData['LayerData'].length + 2) + 2;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8(this.EdgeData['LayerType'], pos++);
        buf.writeUInt8(this.EdgeData['Direction'], pos++);
        buf.writeUInt16LE(this.EdgeData['LayerData'].length, pos);
        pos += 2;
        this.EdgeData['LayerData'].copy(buf, pos);
        pos += this.EdgeData['LayerData'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjEdgeData: {
            LayerType: number,
            Direction: number,
            LayerData: Buffer
        } = {
            LayerType: 0,
            Direction: 0,
            LayerData: Buffer.allocUnsafe(0)
        };
        newObjEdgeData['LayerType'] = buf.readUInt8(pos++);
        newObjEdgeData['Direction'] = buf.readUInt8(pos++);
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjEdgeData['LayerData'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.EdgeData = newObjEdgeData;
        return pos - startPos;
    }
}

