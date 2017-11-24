// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class SimCrashedPacket implements Packet
{
    name = 'SimCrashed';
    flags = MessageFlags.FrequencyLow;
    id = 4294902088;

    Data: {
        RegionX: number;
        RegionY: number;
    };
    Users: {
        AgentID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.Users.length) + 9;
    }

}
