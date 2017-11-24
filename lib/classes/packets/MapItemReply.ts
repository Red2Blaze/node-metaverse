// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class MapItemReplyPacket implements Packet
{
    name = 'MapItemReply';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902171;

    AgentData: {
        AgentID: UUID;
        Flags: number;
    };
    RequestData: {
        ItemType: number;
    };
    Data: {
        X: number;
        Y: number;
        ID: UUID;
        Extra: number;
        Extra2: number;
        Name: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.Data, 'Name', 1) + 32) * this.Data.length) + 25;
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
