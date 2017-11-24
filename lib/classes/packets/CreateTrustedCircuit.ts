// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class CreateTrustedCircuitPacket implements Packet
{
    name = 'CreateTrustedCircuit';
    flags = MessageFlags.FrequencyLow;
    id = 4294902152;

    DataBlock: {
        EndPointID: UUID;
        Digest: Buffer;
    };

    getSize(): number
    {
        return 48;
    }

}
