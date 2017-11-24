// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectDelinkPacket implements Packet
{
    name = 'ObjectDelink';
    flags = MessageFlags.FrequencyLow;
    id = 4294901876;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
    }[];

    getSize(): number
    {
        return ((4) * this.ObjectData.length) + 33;
    }

}
