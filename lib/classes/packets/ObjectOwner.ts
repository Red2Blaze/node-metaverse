// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectOwnerPacket implements Packet
{
    name = 'ObjectOwner';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901860;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    HeaderData: {
        Override: boolean;
        OwnerID: UUID;
        GroupID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
    }[];

    getSize(): number
    {
        return ((4) * this.ObjectData.length) + 66;
    }

}
