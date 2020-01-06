// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class ParcelPropertiesRequestMessage implements MessageBase
{
    name = 'ParcelPropertiesRequest';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyMedium;
    id = Message.ParcelPropertiesRequest;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ParcelData: {
        SequenceID: number;
        West: number;
        South: number;
        East: number;
        North: number;
        SnapSelection: boolean;
    };

    getSize(): number
    {
        return 53;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.ParcelData['SequenceID'], pos);
        pos += 4;
        buf.writeFloatLE(this.ParcelData['West'], pos);
        pos += 4;
        buf.writeFloatLE(this.ParcelData['South'], pos);
        pos += 4;
        buf.writeFloatLE(this.ParcelData['East'], pos);
        pos += 4;
        buf.writeFloatLE(this.ParcelData['North'], pos);
        pos += 4;
        buf.writeUInt8((this.ParcelData['SnapSelection']) ? 1 : 0, pos++);
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjParcelData: {
            SequenceID: number,
            West: number,
            South: number,
            East: number,
            North: number,
            SnapSelection: boolean
        } = {
            SequenceID: 0,
            West: 0,
            South: 0,
            East: 0,
            North: 0,
            SnapSelection: false
        };
        newObjParcelData['SequenceID'] = buf.readInt32LE(pos);
        pos += 4;
        newObjParcelData['West'] = buf.readFloatLE(pos);
        pos += 4;
        newObjParcelData['South'] = buf.readFloatLE(pos);
        pos += 4;
        newObjParcelData['East'] = buf.readFloatLE(pos);
        pos += 4;
        newObjParcelData['North'] = buf.readFloatLE(pos);
        pos += 4;
        newObjParcelData['SnapSelection'] = (buf.readUInt8(pos++) === 1);
        this.ParcelData = newObjParcelData;
        return pos - startPos;
    }
}

