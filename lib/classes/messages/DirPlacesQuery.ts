// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class DirPlacesQueryMessage implements MessageBase
{
    name = 'DirPlacesQuery';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.DirPlacesQuery;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    QueryData: {
        QueryID: UUID;
        QueryText: Buffer;
        QueryFlags: number;
        Category: number;
        SimName: Buffer;
        QueryStart: number;
    };

    getSize(): number
    {
        return (this.QueryData['QueryText'].length + 1 + this.QueryData['SimName'].length + 1) + 57;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.QueryData['QueryID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.QueryData['QueryText'].length, pos++);
        this.QueryData['QueryText'].copy(buf, pos);
        pos += this.QueryData['QueryText'].length;
        buf.writeUInt32LE(this.QueryData['QueryFlags'], pos);
        pos += 4;
        buf.writeInt8(this.QueryData['Category'], pos++);
        buf.writeUInt8(this.QueryData['SimName'].length, pos++);
        this.QueryData['SimName'].copy(buf, pos);
        pos += this.QueryData['SimName'].length;
        buf.writeInt32LE(this.QueryData['QueryStart'], pos);
        pos += 4;
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
        const newObjQueryData: {
            QueryID: UUID,
            QueryText: Buffer,
            QueryFlags: number,
            Category: number,
            SimName: Buffer,
            QueryStart: number
        } = {
            QueryID: UUID.zero(),
            QueryText: Buffer.allocUnsafe(0),
            QueryFlags: 0,
            Category: 0,
            SimName: Buffer.allocUnsafe(0),
            QueryStart: 0
        };
        newObjQueryData['QueryID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjQueryData['QueryText'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjQueryData['QueryFlags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjQueryData['Category'] = buf.readInt8(pos++);
        varLength = buf.readUInt8(pos++);
        newObjQueryData['SimName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjQueryData['QueryStart'] = buf.readInt32LE(pos);
        pos += 4;
        this.QueryData = newObjQueryData;
        return pos - startPos;
    }
}

