// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RegionPresenceRequestByRegionIDPacket implements Packet
{
    name = 'RegionPresenceRequestByRegionID';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901774;

    RegionData: {
        RegionID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.RegionData.length) + 1;
    }

}
