// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {IPAddress} from '../IPAddress';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class NeighborListPacket implements Packet
{
    name = 'NeighborList';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyHigh;
    id = 3;

    NeighborBlock: {
        IP: IPAddress;
        Port: number;
        PublicIP: IPAddress;
        PublicPort: number;
        RegionID: UUID;
        Name: string;
        SimAccess: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.NeighborBlock, 'Name', 1)) * 4) + 116;
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
