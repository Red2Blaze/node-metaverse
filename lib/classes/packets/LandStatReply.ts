// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class LandStatReplyPacket implements Packet
{
    name = 'LandStatReply';
    flags = MessageFlags.Trusted | MessageFlags.Deprecated | MessageFlags.FrequencyLow;
    id = 4294902182;

    RequestData: {
        ReportType: number;
        RequestFlags: number;
        TotalObjectCount: number;
    };
    ReportData: {
        TaskLocalID: number;
        TaskID: UUID;
        LocationX: number;
        LocationY: number;
        LocationZ: number;
        Score: number;
        TaskName: string;
        OwnerName: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.ReportData, 'TaskName', 1) + this.calculateVarVarSize(this.ReportData, 'OwnerName', 1) + 36) * this.ReportData.length) + 13;
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
