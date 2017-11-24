// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class TeleportLocationRequestPacket implements Packet
{
    name = 'TeleportLocationRequest';
    flags = MessageFlags.FrequencyLow;
    id = 4294901823;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Info: {
        RegionHandle: Long;
        Position: Vector3;
        LookAt: Vector3;
    };

    getSize(): number
    {
        return 64;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['SessionID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeInt32LE(this.Info['RegionHandle'].low, pos);
         pos += 4;
         buf.writeInt32LE(this.Info['RegionHandle'].high, pos);
         pos += 4;
         this.Info['Position'].writeToBuffer(buf, pos, false);
         pos += 12;
         this.Info['LookAt'].writeToBuffer(buf, pos, false);
         pos += 12;
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
         const newObjInfo: {
             RegionHandle: Long,
             Position: Vector3,
             LookAt: Vector3
         } = {
             RegionHandle: Long.ZERO,
             Position: Vector3.getZero(),
             LookAt: Vector3.getZero()
         };
         newObjInfo['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
         pos += 8;
         newObjInfo['Position'] = new Vector3(buf, pos, false);
         pos += 12;
         newObjInfo['LookAt'] = new Vector3(buf, pos, false);
         pos += 12;
         this.Info = newObjInfo;
         return pos - startPos;
     }
}

