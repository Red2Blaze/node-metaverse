// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class PayPriceReplyMessage implements MessageBase
{
    name = 'PayPriceReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.PayPriceReply;

    ObjectData: {
        ObjectID: UUID;
        DefaultPayPrice: number;
    };
    ButtonData: {
        PayButton: number;
    }[];

    getSize(): number
    {
        return ((4) * this.ButtonData.length) + 21;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.ObjectData['ObjectID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.ObjectData['DefaultPayPrice'], pos);
        pos += 4;
        const count = this.ButtonData.length;
        buf.writeUInt8(this.ButtonData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeInt32LE(this.ButtonData[i]['PayButton'], pos);
            pos += 4;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjObjectData: {
            ObjectID: UUID,
            DefaultPayPrice: number
        } = {
            ObjectID: UUID.zero(),
            DefaultPayPrice: 0
        };
        newObjObjectData['ObjectID'] = new UUID(buf, pos);
        pos += 16;
        newObjObjectData['DefaultPayPrice'] = buf.readInt32LE(pos);
        pos += 4;
        this.ObjectData = newObjObjectData;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.ButtonData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjButtonData: {
                PayButton: number
            } = {
                PayButton: 0
            };
            newObjButtonData['PayButton'] = buf.readInt32LE(pos);
            pos += 4;
            this.ButtonData.push(newObjButtonData);
        }
        return pos - startPos;
    }
}

