// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class RemoveMuteListEntryMessage implements MessageBase
{
    name = 'RemoveMuteListEntry';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.RemoveMuteListEntry;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    MuteData: {
        MuteID: UUID;
        MuteName: Buffer;
    };

    getSize(): number
    {
        return (this.MuteData['MuteName'].length + 1) + 48;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.MuteData['MuteID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.MuteData['MuteName'].length, pos++);
        this.MuteData['MuteName'].copy(buf, pos);
        pos += this.MuteData['MuteName'].length;
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
        const newObjMuteData: {
            MuteID: UUID,
            MuteName: Buffer
        } = {
            MuteID: UUID.zero(),
            MuteName: Buffer.allocUnsafe(0)
        };
        newObjMuteData['MuteID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjMuteData['MuteName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.MuteData = newObjMuteData;
        return pos - startPos;
    }
}

