// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class InviteGroupRequestPacket implements Packet
{
    name = 'InviteGroupRequest';
    flags = MessageFlags.FrequencyLow;
    id = 4294902109;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    GroupData: {
        GroupID: UUID;
    };
    InviteData: {
        InviteeID: UUID;
        RoleID: UUID;
    }[];

    getSize(): number
    {
        return ((32) * this.InviteData.length) + 49;
    }

}
