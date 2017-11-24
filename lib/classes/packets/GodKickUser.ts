// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class GodKickUserPacket implements Packet
{
    name = 'GodKickUser';
    flags = MessageFlags.FrequencyLow;
    id = 4294901925;

    UserInfo: {
        GodID: UUID;
        GodSessionID: UUID;
        AgentID: UUID;
        KickFlags: number;
        Reason: string;
    };

    getSize(): number
    {
        return (this.UserInfo['Reason'].length + 2) + 52;
    }

}
