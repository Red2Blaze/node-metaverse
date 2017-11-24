// This file has been automatically generated by writePacketClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class SimStatusPacket implements Packet
{
    name = 'SimStatus';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyMedium;
    id = 65292;

    SimStatus: {
        CanAcceptAgents: boolean;
        CanAcceptTasks: boolean;
    };
    SimFlags: {
        Flags: Long;
    };

    getSize(): number
    {
        return 10;
    }

}
