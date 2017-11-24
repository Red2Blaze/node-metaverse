// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectNamePacket implements Packet
{
    name = 'ObjectName';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901867;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        LocalID: number;
        Name: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.ObjectData, 'Name', 1) + 4) * this.ObjectData.length) + 33;
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
