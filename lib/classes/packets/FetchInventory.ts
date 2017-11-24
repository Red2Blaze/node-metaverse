// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class FetchInventoryPacket implements Packet
{
    name = 'FetchInventory';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902039;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    InventoryData: {
        OwnerID: UUID;
        ItemID: UUID;
    }[];

    getSize(): number
    {
        return ((32) * this.InventoryData.length) + 33;
    }

}
