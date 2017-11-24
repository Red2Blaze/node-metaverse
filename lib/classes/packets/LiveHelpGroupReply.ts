// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class LiveHelpGroupReplyPacket implements Packet
{
    name = 'LiveHelpGroupReply';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902140;

    ReplyData: {
        RequestID: UUID;
        GroupID: UUID;
        Selection: string;
    };

    getSize(): number
    {
        return (this.ReplyData['Selection'].length + 1) + 32;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.ReplyData['RequestID'].writeToBuffer(buf, pos);
         pos += 16;
         this.ReplyData['GroupID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.write(this.ReplyData['Selection'], pos);
         pos += this.ReplyData['Selection'].length;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjReplyData: {
             RequestID: UUID,
             GroupID: UUID,
             Selection: string
         } = {
             RequestID: UUID.zero(),
             GroupID: UUID.zero(),
             Selection: ''
         };
         newObjReplyData['RequestID'] = new UUID(buf, pos);
         pos += 16;
         newObjReplyData['GroupID'] = new UUID(buf, pos);
         pos += 16;
         newObjReplyData['Selection'] = buf.toString('utf8', pos, length);
         pos += length;
         this.ReplyData = newObjReplyData;
         return pos - startPos;
     }
}

