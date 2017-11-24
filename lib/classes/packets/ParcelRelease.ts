// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ParcelReleasePacket implements Packet
{
    name = 'ParcelRelease';
    flags = MessageFlags.FrequencyLow;
    id = 4294901972;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        LocalID: number;
    };

    getSize(): number
    {
        return 36;
    }

}
