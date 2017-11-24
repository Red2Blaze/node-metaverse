// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RequestRegionInfoPacket implements Packet
{
    name = 'RequestRegionInfo';
    flags = MessageFlags.FrequencyLow;
    id = 4294901901;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };

    getSize(): number
    {
        return 32;
    }

}
