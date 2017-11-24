// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class CopyInventoryItemPacket implements Packet
{
    name = 'CopyInventoryItem';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902029;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    InventoryData: {
        CallbackID: number;
        OldAgentID: UUID;
        OldItemID: UUID;
        NewFolderID: UUID;
        NewName: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.InventoryData, 'NewName', 1) + 52) * this.InventoryData.length) + 33;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

}
