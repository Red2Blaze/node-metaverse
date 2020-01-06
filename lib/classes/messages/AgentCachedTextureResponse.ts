// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class AgentCachedTextureResponseMessage implements MessageBase
{
    name = 'AgentCachedTextureResponse';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.AgentCachedTextureResponse;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        SerialNum: number;
    };
    WearableData: {
        TextureID: UUID;
        TextureIndex: number;
        HostName: Buffer;
    }[];

    getSize(): number
    {
        return this.calculateVarVarSize(this.WearableData, 'HostName', 1) + ((17) * this.WearableData.length) + 37;
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
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.AgentData['SerialNum'], pos);
        pos += 4;
        const count = this.WearableData.length;
        buf.writeUInt8(this.WearableData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.WearableData[i]['TextureID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.WearableData[i]['TextureIndex'], pos++);
            buf.writeUInt8(this.WearableData[i]['HostName'].length, pos++);
            this.WearableData[i]['HostName'].copy(buf, pos);
            pos += this.WearableData[i]['HostName'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID,
            SerialNum: number
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero(),
            SerialNum: 0
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SerialNum'] = buf.readInt32LE(pos);
        pos += 4;
        this.AgentData = newObjAgentData;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.WearableData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjWearableData: {
                TextureID: UUID,
                TextureIndex: number,
                HostName: Buffer
            } = {
                TextureID: UUID.zero(),
                TextureIndex: 0,
                HostName: Buffer.allocUnsafe(0)
            };
            newObjWearableData['TextureID'] = new UUID(buf, pos);
            pos += 16;
            newObjWearableData['TextureIndex'] = buf.readUInt8(pos++);
            varLength = buf.readUInt8(pos++);
            newObjWearableData['HostName'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.WearableData.push(newObjWearableData);
        }
        return pos - startPos;
    }
}

