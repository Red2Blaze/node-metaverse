// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class GrantGodlikePowersPacket implements Packet
{
    name = 'GrantGodlikePowers';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902018;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    GrantData: {
        GodLevel: number;
        Token: UUID;
    };

    getSize(): number
    {
        return 49;
    }

}
