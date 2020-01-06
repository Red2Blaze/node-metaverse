// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class AcceptFriendshipMessage implements MessageBase
{
    name = 'AcceptFriendship';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.AcceptFriendship;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    TransactionBlock: {
        TransactionID: UUID;
    };
    FolderData: {
        FolderID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.FolderData.length) + 49;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.TransactionBlock['TransactionID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.FolderData.length;
        buf.writeUInt8(this.FolderData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.FolderData[i]['FolderID'].writeToBuffer(buf, pos);
            pos += 16;
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
        const newObjTransactionBlock: {
            TransactionID: UUID
        } = {
            TransactionID: UUID.zero()
        };
        newObjTransactionBlock['TransactionID'] = new UUID(buf, pos);
        pos += 16;
        this.TransactionBlock = newObjTransactionBlock;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.FolderData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjFolderData: {
                FolderID: UUID
            } = {
                FolderID: UUID.zero()
            };
            newObjFolderData['FolderID'] = new UUID(buf, pos);
            pos += 16;
            this.FolderData.push(newObjFolderData);
        }
        return pos - startPos;
    }
}

