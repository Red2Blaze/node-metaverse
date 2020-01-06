// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class ParcelSalesMessage implements MessageBase
{
    name = 'ParcelSales';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ParcelSales;

    ParcelData: {
        ParcelID: UUID;
        BuyerID: UUID;
    }[];

    getSize(): number
    {
        return ((32) * this.ParcelData.length) + 1;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        const count = this.ParcelData.length;
        buf.writeUInt8(this.ParcelData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.ParcelData[i]['ParcelID'].writeToBuffer(buf, pos);
            pos += 16;
            this.ParcelData[i]['BuyerID'].writeToBuffer(buf, pos);
            pos += 16;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.ParcelData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjParcelData: {
                ParcelID: UUID,
                BuyerID: UUID
            } = {
                ParcelID: UUID.zero(),
                BuyerID: UUID.zero()
            };
            newObjParcelData['ParcelID'] = new UUID(buf, pos);
            pos += 16;
            newObjParcelData['BuyerID'] = new UUID(buf, pos);
            pos += 16;
            this.ParcelData.push(newObjParcelData);
        }
        return pos - startPos;
    }
}

