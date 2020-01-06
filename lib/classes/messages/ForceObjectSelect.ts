// This file has been automatically generated by writeMessageClasses.js

import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class ForceObjectSelectMessage implements MessageBase
{
    name = 'ForceObjectSelect';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ForceObjectSelect;

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

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8((this.Header['ResetList']) ? 1 : 0, pos++);
        const count = this.Data.length;
        buf.writeUInt8(this.Data.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt32LE(this.Data[i]['LocalID'], pos);
            pos += 4;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjHeader: {
            ResetList: boolean
        } = {
            ResetList: false
        };
        newObjHeader['ResetList'] = (buf.readUInt8(pos++) === 1);
        this.Header = newObjHeader;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.Data = [];
        for (let i = 0; i < count; i++)
        {
            const newObjData: {
                LocalID: number
            } = {
                LocalID: 0
            };
            newObjData['LocalID'] = buf.readUInt32LE(pos);
            pos += 4;
            this.Data.push(newObjData);
        }
        return pos - startPos;
    }
}

