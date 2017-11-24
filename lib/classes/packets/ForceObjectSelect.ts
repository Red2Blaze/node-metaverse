// This file has been automatically generated by writePacketClasses.js

import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ForceObjectSelectPacket implements Packet
{
    name = 'ForceObjectSelect';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901965;

    Header: {
        ResetList: boolean;
    };
    Data: {
        LocalID: number;
    }[];

    getSize(): number
    {
        return ((4) * this.Data.length) + 2;
    }

}
