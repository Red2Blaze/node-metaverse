// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class TransferAbortPacket implements Packet
{
    name = 'TransferAbort';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901915;

    TransferInfo: {
        TransferID: UUID;
        ChannelType: number;
    };

    getSize(): number
    {
        return 20;
    }

}
