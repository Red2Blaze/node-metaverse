// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class EventInfoRequestPacket implements Packet
{
    name = 'EventInfoRequest';
    flags = MessageFlags.FrequencyLow;
    id = 4294901939;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    EventData: {
        EventID: number;
    };

    getSize(): number
    {
        return 36;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt32LE(this.EventData['EventID'], pos);
         pos += 4;
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
         const newObjEventData: {
             EventID: number
         } = {
             EventID: 0
         };
         newObjEventData['EventID'] = buf.readUInt32LE(pos);
         pos += 4;
         this.EventData = newObjEventData;
         return pos - startPos;
     }
}

