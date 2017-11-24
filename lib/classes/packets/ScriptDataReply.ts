// This file has been automatically generated by writePacketClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ScriptDataReplyPacket implements Packet
{
    name = 'ScriptDataReply';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902098;

    DataBlock: {
        Hash: Long;
        Reply: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.DataBlock, 'Reply', 2) + 8) * this.DataBlock.length) + 1;
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
