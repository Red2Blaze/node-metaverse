// This file has been automatically generated by writePacketClasses.js

import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ScriptTeleportRequestPacket implements Packet
{
    name = 'ScriptTeleportRequest';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294901955;

    Data: {
        ObjectName: string;
        SimName: string;
        SimPosition: Vector3;
        LookAt: Vector3;
    };

    getSize(): number
    {
        return (this.Data['ObjectName'].length + 1 + this.Data['SimName'].length + 1) + 24;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         buf.write(this.Data['ObjectName'], pos);
         pos += this.Data['ObjectName'].length;
         buf.write(this.Data['SimName'], pos);
         pos += this.Data['SimName'].length;
         this.Data['SimPosition'].writeToBuffer(buf, pos, false);
         pos += 12;
         this.Data['LookAt'].writeToBuffer(buf, pos, false);
         pos += 12;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjData: {
             ObjectName: string,
             SimName: string,
             SimPosition: Vector3,
             LookAt: Vector3
         } = {
             ObjectName: '',
             SimName: '',
             SimPosition: Vector3.getZero(),
             LookAt: Vector3.getZero()
         };
         newObjData['ObjectName'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjData['SimName'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjData['SimPosition'] = new Vector3(buf, pos, false);
         pos += 12;
         newObjData['LookAt'] = new Vector3(buf, pos, false);
         pos += 12;
         this.Data = newObjData;
         return pos - startPos;
     }
}

