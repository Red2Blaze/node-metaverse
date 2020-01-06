// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { IPAddress } from '../IPAddress';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class RpcScriptRequestInboundForwardMessage implements MessageBase
{
    name = 'RpcScriptRequestInboundForward';
    messageFlags = MessageFlags.Trusted | MessageFlags.Deprecated | MessageFlags.FrequencyLow;
    id = Message.RpcScriptRequestInboundForward;

    DataBlock: {
        RPCServerIP: IPAddress;
        RPCServerPort: number;
        TaskID: UUID;
        ItemID: UUID;
        ChannelID: UUID;
        IntValue: number;
        StringValue: Buffer;
    };

    getSize(): number
    {
        return (this.DataBlock['StringValue'].length + 2) + 58;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.DataBlock['RPCServerIP'].writeToBuffer(buf, pos);
        pos += 4;
        buf.writeUInt16LE(this.DataBlock['RPCServerPort'], pos);
        pos += 2;
        this.DataBlock['TaskID'].writeToBuffer(buf, pos);
        pos += 16;
        this.DataBlock['ItemID'].writeToBuffer(buf, pos);
        pos += 16;
        this.DataBlock['ChannelID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.DataBlock['IntValue'], pos);
        pos += 4;
        buf.writeUInt16LE(this.DataBlock['StringValue'].length, pos);
        pos += 2;
        this.DataBlock['StringValue'].copy(buf, pos);
        pos += this.DataBlock['StringValue'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjDataBlock: {
            RPCServerIP: IPAddress,
            RPCServerPort: number,
            TaskID: UUID,
            ItemID: UUID,
            ChannelID: UUID,
            IntValue: number,
            StringValue: Buffer
        } = {
            RPCServerIP: IPAddress.zero(),
            RPCServerPort: 0,
            TaskID: UUID.zero(),
            ItemID: UUID.zero(),
            ChannelID: UUID.zero(),
            IntValue: 0,
            StringValue: Buffer.allocUnsafe(0)
        };
        newObjDataBlock['RPCServerIP'] = new IPAddress(buf, pos);
        pos += 4;
        newObjDataBlock['RPCServerPort'] = buf.readUInt16LE(pos);
        pos += 2;
        newObjDataBlock['TaskID'] = new UUID(buf, pos);
        pos += 16;
        newObjDataBlock['ItemID'] = new UUID(buf, pos);
        pos += 16;
        newObjDataBlock['ChannelID'] = new UUID(buf, pos);
        pos += 16;
        newObjDataBlock['IntValue'] = buf.readUInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjDataBlock['StringValue'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        this.DataBlock = newObjDataBlock;
        return pos - startPos;
    }
}

