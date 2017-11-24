// This file has been automatically generated by writePacketClasses.js

import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class SubscribeLoadPacket implements Packet
{
    name = 'SubscribeLoad';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901767;


    getSize(): number
    {
        return 0;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         return 0;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         return 0;
     }
}

