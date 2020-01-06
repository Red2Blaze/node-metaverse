// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { Vector3 } from '../Vector3';
import * as Long from 'long';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class AgentMovementCompleteMessage implements MessageBase
{
    name = 'AgentMovementComplete';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.AgentMovementComplete;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        Position: Vector3;
        LookAt: Vector3;
        RegionHandle: Long;
        Timestamp: number;
    };
    SimData: {
        ChannelVersion: Buffer;
    };

    getSize(): number
    {
        return (this.SimData['ChannelVersion'].length + 2) + 68;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['Position'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.Data['LookAt'].writeToBuffer(buf, pos, false);
        pos += 12;
        buf.writeInt32LE(this.Data['RegionHandle'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.Data['RegionHandle'].high, pos);
        pos += 4;
        buf.writeUInt32LE(this.Data['Timestamp'], pos);
        pos += 4;
        buf.writeUInt16LE(this.SimData['ChannelVersion'].length, pos);
        pos += 2;
        this.SimData['ChannelVersion'].copy(buf, pos);
        pos += this.SimData['ChannelVersion'].length;
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
        const newObjData: {
            Position: Vector3,
            LookAt: Vector3,
            RegionHandle: Long,
            Timestamp: number
        } = {
            Position: Vector3.getZero(),
            LookAt: Vector3.getZero(),
            RegionHandle: Long.ZERO,
            Timestamp: 0
        };
        newObjData['Position'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjData['LookAt'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjData['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        newObjData['Timestamp'] = buf.readUInt32LE(pos);
        pos += 4;
        this.Data = newObjData;
        const newObjSimData: {
            ChannelVersion: Buffer
        } = {
            ChannelVersion: Buffer.allocUnsafe(0)
        };
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjSimData['ChannelVersion'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.SimData = newObjSimData;
        return pos - startPos;
    }
}

