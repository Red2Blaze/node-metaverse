// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ChildAgentPositionUpdatePacket implements Packet
{
    name = 'ChildAgentPositionUpdate';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyHigh;
    id = 27;

    AgentData: {
        RegionHandle: Long;
        ViewerCircuitCode: number;
        AgentID: UUID;
        SessionID: UUID;
        AgentPos: Vector3;
        AgentVel: Vector3;
        Center: Vector3;
        Size: Vector3;
        AtAxis: Vector3;
        LeftAxis: Vector3;
        UpAxis: Vector3;
        ChangedGrid: boolean;
    };

    getSize(): number
    {
        return 129;
    }

}
