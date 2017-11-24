// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class TrackAgentPacket implements Packet
{
    name = 'TrackAgent';
    flags = MessageFlags.FrequencyLow;
    id = 4294901890;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    TargetData: {
        PreyID: UUID;
    };

    getSize(): number
    {
        return 48;
    }

}
