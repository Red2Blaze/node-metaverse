// This file has been automatically generated by writePacketClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectUpdateCachedPacket implements Packet
{
    name = 'ObjectUpdateCached';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyHigh;
    id = 14;

    RegionData: {
        RegionHandle: Long;
        TimeDilation: number;
    };
    ObjectData: {
        ID: number;
        CRC: number;
        UpdateFlags: number;
    }[];

    getSize(): number
    {
        return ((12) * this.ObjectData.length) + 11;
    }

}
