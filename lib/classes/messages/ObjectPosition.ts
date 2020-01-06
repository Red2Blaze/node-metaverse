// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { Vector3 } from '../Vector3';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class ObjectPositionMessage implements MessageBase
{
    name = 'ObjectPosition';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.Deprecated | MessageFlags.FrequencyMedium;
    id = Message.ObjectPosition;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
        Position: Vector3;
    }[];

    getSize(): number
    {
        return ((16) * this.ObjectData.length) + 33;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.ObjectData.length;
        buf.writeUInt8(this.ObjectData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt32LE(this.ObjectData[i]['ObjectLocalID'], pos);
            pos += 4;
            this.ObjectData[i]['Position'].writeToBuffer(buf, pos, false);
            pos += 12;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
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
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.ObjectData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjObjectData: {
                ObjectLocalID: number,
                Position: Vector3
            } = {
                ObjectLocalID: 0,
                Position: Vector3.getZero()
            };
            newObjObjectData['ObjectLocalID'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjObjectData['Position'] = new Vector3(buf, pos, false);
            pos += 12;
            this.ObjectData.push(newObjObjectData);
        }
        return pos - startPos;
    }
}

