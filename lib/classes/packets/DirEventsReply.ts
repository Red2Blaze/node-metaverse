// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class DirEventsReplyPacket implements Packet
{
    name = 'DirEventsReply';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901797;

    AgentData: {
        AgentID: UUID;
    };
    QueryData: {
        QueryID: UUID;
    };
    QueryReplies: {
        OwnerID: UUID;
        Name: string;
        EventID: number;
        Date: string;
        UnixTime: number;
        EventFlags: number;
    }[];
    StatusData: {
        Status: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.QueryReplies, 'Name', 1) + this.calculateVarVarSize(this.QueryReplies, 'Date', 1) + 28) * this.QueryReplies.length) + ((4) * this.StatusData.length) + 34;
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
