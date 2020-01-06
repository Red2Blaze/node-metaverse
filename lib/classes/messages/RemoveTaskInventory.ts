// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class RemoveTaskInventoryMessage implements MessageBase
{
    name = 'RemoveTaskInventory';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.RemoveTaskInventory;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    InventoryData: {
        LocalID: number;
        ItemID: UUID;
    };

    getSize(): number
    {
        return 52;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.InventoryData['LocalID'], pos);
        pos += 4;
        this.InventoryData['ItemID'].writeToBuffer(buf, pos);
        pos += 16;
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
        const newObjInventoryData: {
            LocalID: number,
            ItemID: UUID
        } = {
            LocalID: 0,
            ItemID: UUID.zero()
        };
        newObjInventoryData['LocalID'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjInventoryData['ItemID'] = new UUID(buf, pos);
        pos += 16;
        this.InventoryData = newObjInventoryData;
        return pos - startPos;
    }
}

