// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class BulkUpdateInventoryPacket implements Packet
{
    name = 'BulkUpdateInventory';
    flags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902041;

    AgentData: {
        AgentID: UUID;
        TransactionID: UUID;
    };
    FolderData: {
        FolderID: UUID;
        ParentID: UUID;
        Type: number;
        Name: string;
    }[];
    ItemData: {
        ItemID: UUID;
        CallbackID: number;
        FolderID: UUID;
        CreatorID: UUID;
        OwnerID: UUID;
        GroupID: UUID;
        BaseMask: number;
        OwnerMask: number;
        GroupMask: number;
        EveryoneMask: number;
        NextOwnerMask: number;
        GroupOwned: boolean;
        AssetID: UUID;
        Type: number;
        InvType: number;
        Flags: number;
        SaleType: number;
        SalePrice: number;
        Name: string;
        Description: string;
        CreationDate: number;
        CRC: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.FolderData, 'Name', 1) + 33) * this.FolderData.length) + ((this.calculateVarVarSize(this.ItemData, 'Name', 1) + this.calculateVarVarSize(this.ItemData, 'Description', 1) + 140) * this.ItemData.length) + 34;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

     writeToBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         this.AgentData['AgentID'].writeToBuffer(buf, pos);
         pos += 16;
         this.AgentData['TransactionID'].writeToBuffer(buf, pos);
         pos += 16;
         let count = this.FolderData.length;
         buf.writeUInt8(this.FolderData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.FolderData[i]['FolderID'].writeToBuffer(buf, pos);
             pos += 16;
             this.FolderData[i]['ParentID'].writeToBuffer(buf, pos);
             pos += 16;
             buf.writeInt8(this.FolderData[i]['Type'], pos++);
             buf.write(this.FolderData[i]['Name'], pos);
             pos += this.FolderData[i]['Name'].length;
         }
         count = this.ItemData.length;
         buf.writeUInt8(this.ItemData.length, pos++);
         for (let i = 0; i < count; i++)
         {
             this.ItemData[i]['ItemID'].writeToBuffer(buf, pos);
             pos += 16;
             buf.writeUInt32LE(this.ItemData[i]['CallbackID'], pos);
             pos += 4;
             this.ItemData[i]['FolderID'].writeToBuffer(buf, pos);
             pos += 16;
             this.ItemData[i]['CreatorID'].writeToBuffer(buf, pos);
             pos += 16;
             this.ItemData[i]['OwnerID'].writeToBuffer(buf, pos);
             pos += 16;
             this.ItemData[i]['GroupID'].writeToBuffer(buf, pos);
             pos += 16;
             buf.writeUInt32LE(this.ItemData[i]['BaseMask'], pos);
             pos += 4;
             buf.writeUInt32LE(this.ItemData[i]['OwnerMask'], pos);
             pos += 4;
             buf.writeUInt32LE(this.ItemData[i]['GroupMask'], pos);
             pos += 4;
             buf.writeUInt32LE(this.ItemData[i]['EveryoneMask'], pos);
             pos += 4;
             buf.writeUInt32LE(this.ItemData[i]['NextOwnerMask'], pos);
             pos += 4;
             buf.writeUInt8((this.ItemData[i]['GroupOwned']) ? 1 : 0, pos++);
             this.ItemData[i]['AssetID'].writeToBuffer(buf, pos);
             pos += 16;
             buf.writeInt8(this.ItemData[i]['Type'], pos++);
             buf.writeInt8(this.ItemData[i]['InvType'], pos++);
             buf.writeUInt32LE(this.ItemData[i]['Flags'], pos);
             pos += 4;
             buf.writeUInt8(this.ItemData[i]['SaleType'], pos++);
             buf.writeInt32LE(this.ItemData[i]['SalePrice'], pos);
             pos += 4;
             buf.write(this.ItemData[i]['Name'], pos);
             pos += this.ItemData[i]['Name'].length;
             buf.write(this.ItemData[i]['Description'], pos);
             pos += this.ItemData[i]['Description'].length;
             buf.writeInt32LE(this.ItemData[i]['CreationDate'], pos);
             pos += 4;
             buf.writeUInt32LE(this.ItemData[i]['CRC'], pos);
             pos += 4;
         }
         return pos - startPos;
     }

     readFromBuffer(buf: Buffer, pos: number): number
     {
         const startPos = pos;
         const newObjAgentData: {
             AgentID: UUID,
             TransactionID: UUID
         } = {
             AgentID: UUID.zero(),
             TransactionID: UUID.zero()
         };
         newObjAgentData['AgentID'] = new UUID(buf, pos);
         pos += 16;
         newObjAgentData['TransactionID'] = new UUID(buf, pos);
         pos += 16;
         this.AgentData = newObjAgentData;
         let count = buf.readUInt8(pos++);
         this.FolderData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjFolderData: {
                 FolderID: UUID,
                 ParentID: UUID,
                 Type: number,
                 Name: string
             } = {
                 FolderID: UUID.zero(),
                 ParentID: UUID.zero(),
                 Type: 0,
                 Name: ''
             };
             newObjFolderData['FolderID'] = new UUID(buf, pos);
             pos += 16;
             newObjFolderData['ParentID'] = new UUID(buf, pos);
             pos += 16;
             newObjFolderData['Type'] = buf.readInt8(pos++);
             newObjFolderData['Name'] = buf.toString('utf8', pos, length);
             pos += length;
             this.FolderData.push(newObjFolderData);
         }
         count = buf.readUInt8(pos++);
         this.ItemData = [];
         for (let i = 0; i < count; i++)
         {
             const newObjItemData: {
                 ItemID: UUID,
                 CallbackID: number,
                 FolderID: UUID,
                 CreatorID: UUID,
                 OwnerID: UUID,
                 GroupID: UUID,
                 BaseMask: number,
                 OwnerMask: number,
                 GroupMask: number,
                 EveryoneMask: number,
                 NextOwnerMask: number,
                 GroupOwned: boolean,
                 AssetID: UUID,
                 Type: number,
                 InvType: number,
                 Flags: number,
                 SaleType: number,
                 SalePrice: number,
                 Name: string,
                 Description: string,
                 CreationDate: number,
                 CRC: number
             } = {
                 ItemID: UUID.zero(),
                 CallbackID: 0,
                 FolderID: UUID.zero(),
                 CreatorID: UUID.zero(),
                 OwnerID: UUID.zero(),
                 GroupID: UUID.zero(),
                 BaseMask: 0,
                 OwnerMask: 0,
                 GroupMask: 0,
                 EveryoneMask: 0,
                 NextOwnerMask: 0,
                 GroupOwned: false,
                 AssetID: UUID.zero(),
                 Type: 0,
                 InvType: 0,
                 Flags: 0,
                 SaleType: 0,
                 SalePrice: 0,
                 Name: '',
                 Description: '',
                 CreationDate: 0,
                 CRC: 0
             };
             newObjItemData['ItemID'] = new UUID(buf, pos);
             pos += 16;
             newObjItemData['CallbackID'] = buf.readUInt32LE(pos);
             pos += 4;
             newObjItemData['FolderID'] = new UUID(buf, pos);
             pos += 16;
             newObjItemData['CreatorID'] = new UUID(buf, pos);
             pos += 16;
             newObjItemData['OwnerID'] = new UUID(buf, pos);
             pos += 16;
             newObjItemData['GroupID'] = new UUID(buf, pos);
             pos += 16;
             newObjItemData['BaseMask'] = buf.readUInt32LE(pos);
             pos += 4;
             newObjItemData['OwnerMask'] = buf.readUInt32LE(pos);
             pos += 4;
             newObjItemData['GroupMask'] = buf.readUInt32LE(pos);
             pos += 4;
             newObjItemData['EveryoneMask'] = buf.readUInt32LE(pos);
             pos += 4;
             newObjItemData['NextOwnerMask'] = buf.readUInt32LE(pos);
             pos += 4;
             newObjItemData['GroupOwned'] = (buf.readUInt8(pos++) === 1);
             newObjItemData['AssetID'] = new UUID(buf, pos);
             pos += 16;
             newObjItemData['Type'] = buf.readInt8(pos++);
             newObjItemData['InvType'] = buf.readInt8(pos++);
             newObjItemData['Flags'] = buf.readUInt32LE(pos);
             pos += 4;
             newObjItemData['SaleType'] = buf.readUInt8(pos++);
             newObjItemData['SalePrice'] = buf.readInt32LE(pos);
             pos += 4;
             newObjItemData['Name'] = buf.toString('utf8', pos, length);
             pos += length;
             newObjItemData['Description'] = buf.toString('utf8', pos, length);
             pos += length;
             newObjItemData['CreationDate'] = buf.readInt32LE(pos);
             pos += 4;
             newObjItemData['CRC'] = buf.readUInt32LE(pos);
             pos += 4;
             this.ItemData.push(newObjItemData);
         }
         return pos - startPos;
     }
}

