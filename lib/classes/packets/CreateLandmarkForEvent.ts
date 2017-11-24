// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class CreateLandmarkForEventPacket implements Packet
{
    name = 'CreateLandmarkForEvent';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902066;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    EventData: {
        EventID: number;
    };
    InventoryBlock: {
        FolderID: UUID;
        Name: string;
    };

    getSize(): number
    {
        return (this.InventoryBlock['Name'].length + 1) + 52;
    }

}
