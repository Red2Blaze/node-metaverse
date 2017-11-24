// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class UserReportInternalPacket implements Packet
{
    name = 'UserReportInternal';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901781;

    ReportData: {
        ReportType: number;
        Category: number;
        ReporterID: UUID;
        ViewerPosition: Vector3;
        AgentPosition: Vector3;
        ScreenshotID: UUID;
        ObjectID: UUID;
        OwnerID: UUID;
        LastOwnerID: UUID;
        CreatorID: UUID;
        RegionID: UUID;
        AbuserID: UUID;
        AbuseRegionName: string;
        AbuseRegionID: UUID;
        Summary: string;
        Details: string;
        VersionString: string;
    };

    getSize(): number
    {
        return (this.ReportData['AbuseRegionName'].length + 1 + this.ReportData['Summary'].length + 1 + this.ReportData['Details'].length + 2 + this.ReportData['VersionString'].length + 1) + 170;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         buf.writeUInt8(this.ReportData['ReportType'], pos++);
         buf.writeUInt8(this.ReportData['Category'], pos++);
         this.ReportData['ReporterID'].writeToBuffer(buf, pos);
         pos += 16;
         this.ReportData['ViewerPosition'].writeToBuffer(buf, pos, false);
         pos += 12;
         this.ReportData['AgentPosition'].writeToBuffer(buf, pos, false);
         pos += 12;
         this.ReportData['ScreenshotID'].writeToBuffer(buf, pos);
         pos += 16;
         this.ReportData['ObjectID'].writeToBuffer(buf, pos);
         pos += 16;
         this.ReportData['OwnerID'].writeToBuffer(buf, pos);
         pos += 16;
         this.ReportData['LastOwnerID'].writeToBuffer(buf, pos);
         pos += 16;
         this.ReportData['CreatorID'].writeToBuffer(buf, pos);
         pos += 16;
         this.ReportData['RegionID'].writeToBuffer(buf, pos);
         pos += 16;
         this.ReportData['AbuserID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.write(this.ReportData['AbuseRegionName'], pos);
         pos += this.ReportData['AbuseRegionName'].length;
         this.ReportData['AbuseRegionID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.write(this.ReportData['Summary'], pos);
         pos += this.ReportData['Summary'].length;
         buf.write(this.ReportData['Details'], pos);
         pos += this.ReportData['Details'].length;
         buf.write(this.ReportData['VersionString'], pos);
         pos += this.ReportData['VersionString'].length;
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjReportData: {
             ReportType: number,
             Category: number,
             ReporterID: UUID,
             ViewerPosition: Vector3,
             AgentPosition: Vector3,
             ScreenshotID: UUID,
             ObjectID: UUID,
             OwnerID: UUID,
             LastOwnerID: UUID,
             CreatorID: UUID,
             RegionID: UUID,
             AbuserID: UUID,
             AbuseRegionName: string,
             AbuseRegionID: UUID,
             Summary: string,
             Details: string,
             VersionString: string
         } = {
             ReportType: 0,
             Category: 0,
             ReporterID: UUID.zero(),
             ViewerPosition: Vector3.getZero(),
             AgentPosition: Vector3.getZero(),
             ScreenshotID: UUID.zero(),
             ObjectID: UUID.zero(),
             OwnerID: UUID.zero(),
             LastOwnerID: UUID.zero(),
             CreatorID: UUID.zero(),
             RegionID: UUID.zero(),
             AbuserID: UUID.zero(),
             AbuseRegionName: '',
             AbuseRegionID: UUID.zero(),
             Summary: '',
             Details: '',
             VersionString: ''
         };
         newObjReportData['ReportType'] = buf.readUInt8(pos++);
         newObjReportData['Category'] = buf.readUInt8(pos++);
         newObjReportData['ReporterID'] = new UUID(buf, pos);
         pos += 16;
         newObjReportData['ViewerPosition'] = new Vector3(buf, pos, false);
         pos += 12;
         newObjReportData['AgentPosition'] = new Vector3(buf, pos, false);
         pos += 12;
         newObjReportData['ScreenshotID'] = new UUID(buf, pos);
         pos += 16;
         newObjReportData['ObjectID'] = new UUID(buf, pos);
         pos += 16;
         newObjReportData['OwnerID'] = new UUID(buf, pos);
         pos += 16;
         newObjReportData['LastOwnerID'] = new UUID(buf, pos);
         pos += 16;
         newObjReportData['CreatorID'] = new UUID(buf, pos);
         pos += 16;
         newObjReportData['RegionID'] = new UUID(buf, pos);
         pos += 16;
         newObjReportData['AbuserID'] = new UUID(buf, pos);
         pos += 16;
         newObjReportData['AbuseRegionName'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjReportData['AbuseRegionID'] = new UUID(buf, pos);
         pos += 16;
         newObjReportData['Summary'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjReportData['Details'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjReportData['VersionString'] = buf.toString('utf8', pos, length);
         pos += length;
         this.ReportData = newObjReportData;
         return pos - startPos;
     }
}

