// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class BuyObjectInventoryPacket implements Packet
{
    name = 'BuyObjectInventory';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901863;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        ObjectID: UUID;
        ItemID: UUID;
        FolderID: UUID;
    };

    getSize(): number
    {
        return 80;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         this.Data['ObjectID'].writeToBuffer(buf, pos);
         pos += 16;
         this.Data['ItemID'].writeToBuffer(buf, pos);
         pos += 16;
         this.Data['FolderID'].writeToBuffer(buf, pos);
         pos += 16;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
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
             ObjectID: UUID,
             ItemID: UUID,
             FolderID: UUID
         } = {
             ObjectID: UUID.zero(),
             ItemID: UUID.zero(),
             FolderID: UUID.zero()
         };
         newObjData['ObjectID'] = new UUID(buf, pos);
         pos += 16;
         newObjData['ItemID'] = new UUID(buf, pos);
         pos += 16;
         newObjData['FolderID'] = new UUID(buf, pos);
         pos += 16;
         this.Data = newObjData;
         return pos - startPos;
     }
}

