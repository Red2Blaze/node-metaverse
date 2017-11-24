// This file has been automatically generated by writePacketClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class SimStatsPacket implements Packet
{
    name = 'SimStats';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901900;

    Region: {
        RegionX: number;
        RegionY: number;
        RegionFlags: number;
        ObjectCapacity: number;
    };
    Stat: {
        StatID: number;
        StatValue: number;
    }[];
    PidStat: {
        PID: number;
    };
    RegionInfo: {
        RegionFlagsExtended: Long;
    }[];

    getSize(): number
    {
        return ((8) * this.Stat.length) + ((8) * this.RegionInfo.length) + 22;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         buf.writeUInt32LE(this.Region['RegionX'], pos);
         pos += 4;
         buf.writeUInt32LE(this.Region['RegionY'], pos);
         pos += 4;
         buf.writeUInt32LE(this.Region['RegionFlags'], pos);
         pos += 4;
         buf.writeUInt32LE(this.Region['ObjectCapacity'], pos);
         pos += 4;
         let count = this.Stat.length;
         buf.writeUInt8(this.Stat.length, pos++);
         for (let i = 0; i < count; i++)
         {
             buf.writeUInt32LE(this.Stat[i]['StatID'], pos);
             pos += 4;
             buf.writeFloatLE(this.Stat[i]['StatValue'], pos);
             pos += 4;
         }
         buf.writeInt32LE(this.PidStat['PID'], pos);
         pos += 4;
         count = this.RegionInfo.length;
         buf.writeUInt8(this.RegionInfo.length, pos++);
         for (let i = 0; i < count; i++)
         {
             buf.writeInt32LE(this.RegionInfo[i]['RegionFlagsExtended'].low, pos);
             pos += 4;
             buf.writeInt32LE(this.RegionInfo[i]['RegionFlagsExtended'].high, pos);
             pos += 4;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjRegion: {
             RegionX: number,
             RegionY: number,
             RegionFlags: number,
             ObjectCapacity: number
         } = {
             RegionX: 0,
             RegionY: 0,
             RegionFlags: 0,
             ObjectCapacity: 0
         };
         newObjRegion['RegionX'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjRegion['RegionY'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjRegion['RegionFlags'] = buf.readUInt32LE(pos);
         pos += 4;
         newObjRegion['ObjectCapacity'] = buf.readUInt32LE(pos);
         pos += 4;
         this.Region = newObjRegion;
         let count = buf.readUInt8(pos++);
         this.Stat = [];
         for (let i = 0; i < count; i++)
         {
             const newObjStat: {
                 StatID: number,
                 StatValue: number
             } = {
                 StatID: 0,
                 StatValue: 0
             };
             newObjStat['StatID'] = buf.readUInt32LE(pos);
             pos += 4;
             newObjStat['StatValue'] = buf.readFloatLE(pos);
             pos += 4;
             this.Stat.push(newObjStat);
         }
         const newObjPidStat: {
             PID: number
         } = {
             PID: 0
         };
         newObjPidStat['PID'] = buf.readInt32LE(pos);
         pos += 4;
         this.PidStat = newObjPidStat;
         count = buf.readUInt8(pos++);
         this.RegionInfo = [];
         for (let i = 0; i < count; i++)
         {
             const newObjRegionInfo: {
                 RegionFlagsExtended: Long
             } = {
                 RegionFlagsExtended: Long.ZERO
             };
             newObjRegionInfo['RegionFlagsExtended'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
             pos += 8;
             this.RegionInfo.push(newObjRegionInfo);
         }
         return pos - startPos;
     }
}

