// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ScriptAnswerYesMessage implements MessageBase
{
    name = 'ScriptAnswerYes';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.ScriptAnswerYes;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        TaskID: UUID;
        ItemID: UUID;
        Questions: number;
    };

    getSize(): number
    {
        return 68;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['TaskID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['ItemID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.Data['Questions'], pos);
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
        const newObjData: {
            TaskID: UUID,
            ItemID: UUID,
            Questions: number
        } = {
            TaskID: UUID.zero(),
            ItemID: UUID.zero(),
            Questions: 0
        };
        newObjData['TaskID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['ItemID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['Questions'] = buf.readInt32LE(pos);
        pos += 4;
        this.Data = newObjData;
        return pos - startPos;
    }
}
