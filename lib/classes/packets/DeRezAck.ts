// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class DeRezAckPacket implements Packet
{
    name = 'DeRezAck';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902052;

    TransactionData: {
        TransactionID: UUID;
        Success: boolean;
    };

    getSize(): number
    {
        return 17;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.TransactionData['TransactionID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt8((this.TransactionData['Success']) ? 1 : 0, pos++);
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjTransactionData: {
             TransactionID: UUID,
             Success: boolean
         } = {
             TransactionID: UUID.zero(),
             Success: false
         };
         newObjTransactionData['TransactionID'] = new UUID(buf, pos);
         pos += 16;
         newObjTransactionData['Success'] = (buf.readUInt8(pos++) === 1);
         this.TransactionData = newObjTransactionData;
         return pos - startPos;
     }
}

