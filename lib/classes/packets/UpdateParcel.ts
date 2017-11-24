// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class UpdateParcelPacket implements Packet
{
    name = 'UpdateParcel';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901981;

    ParcelData: {
        ParcelID: UUID;
        RegionHandle: Long;
        OwnerID: UUID;
        GroupOwned: boolean;
        Status: number;
        Name: string;
        Description: string;
        MusicURL: string;
        RegionX: number;
        RegionY: number;
        ActualArea: number;
        BillableArea: number;
        ShowDir: boolean;
        IsForSale: boolean;
        Category: number;
        SnapshotID: UUID;
        UserLocation: Vector3;
        SalePrice: number;
        AuthorizedBuyerID: UUID;
        AllowPublish: boolean;
        MaturePublish: boolean;
    };

    getSize(): number
    {
        return (this.ParcelData['Name'].length + 1 + this.ParcelData['Description'].length + 1 + this.ParcelData['MusicURL'].length + 1) + 111;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.ParcelData['ParcelID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeInt32LE(this.ParcelData['RegionHandle'].low, pos);
         pos += 4;
         buf.writeInt32LE(this.ParcelData['RegionHandle'].high, pos);
         pos += 4;
         this.ParcelData['OwnerID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt8((this.ParcelData['GroupOwned']) ? 1 : 0, pos++);
         buf.writeUInt8(this.ParcelData['Status'], pos++);
         buf.write(this.ParcelData['Name'], pos);
         pos += this.ParcelData['Name'].length;
         buf.write(this.ParcelData['Description'], pos);
         pos += this.ParcelData['Description'].length;
         buf.write(this.ParcelData['MusicURL'], pos);
         pos += this.ParcelData['MusicURL'].length;
         buf.writeFloatLE(this.ParcelData['RegionX'], pos);
         pos += 4;
         buf.writeFloatLE(this.ParcelData['RegionY'], pos);
         pos += 4;
         buf.writeInt32LE(this.ParcelData['ActualArea'], pos);
         pos += 4;
         buf.writeInt32LE(this.ParcelData['BillableArea'], pos);
         pos += 4;
         buf.writeUInt8((this.ParcelData['ShowDir']) ? 1 : 0, pos++);
         buf.writeUInt8((this.ParcelData['IsForSale']) ? 1 : 0, pos++);
         buf.writeUInt8(this.ParcelData['Category'], pos++);
         this.ParcelData['SnapshotID'].writeToBuffer(buf, pos);
         pos += 16;
         this.ParcelData['UserLocation'].writeToBuffer(buf, pos, false);
         pos += 12;
         buf.writeInt32LE(this.ParcelData['SalePrice'], pos);
         pos += 4;
         this.ParcelData['AuthorizedBuyerID'].writeToBuffer(buf, pos);
         pos += 16;
         buf.writeUInt8((this.ParcelData['AllowPublish']) ? 1 : 0, pos++);
         buf.writeUInt8((this.ParcelData['MaturePublish']) ? 1 : 0, pos++);
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjParcelData: {
             ParcelID: UUID,
             RegionHandle: Long,
             OwnerID: UUID,
             GroupOwned: boolean,
             Status: number,
             Name: string,
             Description: string,
             MusicURL: string,
             RegionX: number,
             RegionY: number,
             ActualArea: number,
             BillableArea: number,
             ShowDir: boolean,
             IsForSale: boolean,
             Category: number,
             SnapshotID: UUID,
             UserLocation: Vector3,
             SalePrice: number,
             AuthorizedBuyerID: UUID,
             AllowPublish: boolean,
             MaturePublish: boolean
         } = {
             ParcelID: UUID.zero(),
             RegionHandle: Long.ZERO,
             OwnerID: UUID.zero(),
             GroupOwned: false,
             Status: 0,
             Name: '',
             Description: '',
             MusicURL: '',
             RegionX: 0,
             RegionY: 0,
             ActualArea: 0,
             BillableArea: 0,
             ShowDir: false,
             IsForSale: false,
             Category: 0,
             SnapshotID: UUID.zero(),
             UserLocation: Vector3.getZero(),
             SalePrice: 0,
             AuthorizedBuyerID: UUID.zero(),
             AllowPublish: false,
             MaturePublish: false
         };
         newObjParcelData['ParcelID'] = new UUID(buf, pos);
         pos += 16;
         newObjParcelData['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
         pos += 8;
         newObjParcelData['OwnerID'] = new UUID(buf, pos);
         pos += 16;
         newObjParcelData['GroupOwned'] = (buf.readUInt8(pos++) === 1);
         newObjParcelData['Status'] = buf.readUInt8(pos++);
         newObjParcelData['Name'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjParcelData['Description'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjParcelData['MusicURL'] = buf.toString('utf8', pos, length);
         pos += length;
         newObjParcelData['RegionX'] = buf.readFloatLE(pos);
         pos += 4;
         newObjParcelData['RegionY'] = buf.readFloatLE(pos);
         pos += 4;
         newObjParcelData['ActualArea'] = buf.readInt32LE(pos);
         pos += 4;
         newObjParcelData['BillableArea'] = buf.readInt32LE(pos);
         pos += 4;
         newObjParcelData['ShowDir'] = (buf.readUInt8(pos++) === 1);
         newObjParcelData['IsForSale'] = (buf.readUInt8(pos++) === 1);
         newObjParcelData['Category'] = buf.readUInt8(pos++);
         newObjParcelData['SnapshotID'] = new UUID(buf, pos);
         pos += 16;
         newObjParcelData['UserLocation'] = new Vector3(buf, pos, false);
         pos += 12;
         newObjParcelData['SalePrice'] = buf.readInt32LE(pos);
         pos += 4;
         newObjParcelData['AuthorizedBuyerID'] = new UUID(buf, pos);
         pos += 16;
         newObjParcelData['AllowPublish'] = (buf.readUInt8(pos++) === 1);
         newObjParcelData['MaturePublish'] = (buf.readUInt8(pos++) === 1);
         this.ParcelData = newObjParcelData;
         return pos - startPos;
     }
}

