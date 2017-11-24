// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class DerezContainerPacket implements Packet
{
    name = 'DerezContainer';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901864;

    Data: {
        ObjectID: UUID;
        Delete: boolean;
    };

    getSize(): number
    {
        return 17;
    }

}
