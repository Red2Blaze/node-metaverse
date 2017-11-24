// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class UndoPacket implements Packet
{
    name = 'Undo';
    flags = MessageFlags.FrequencyLow;
    id = 4294901835;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        GroupID: UUID;
    };
    ObjectData: {
        ObjectID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.ObjectData.length) + 49;
    }

}
