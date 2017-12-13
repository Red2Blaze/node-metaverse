"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
const Message_1 = require("../../enums/Message");
class RemoveTaskInventoryMessage {
    constructor() {
        this.name = 'RemoveTaskInventory';
        this.messageFlags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = Message_1.Message.RemoveTaskInventory;
    }
    getSize() {
        return 52;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.InventoryData['LocalID'], pos);
        pos += 4;
        this.InventoryData['ItemID'].writeToBuffer(buf, pos);
        pos += 16;
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            SessionID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjInventoryData = {
            LocalID: 0,
            ItemID: UUID_1.UUID.zero()
        };
        newObjInventoryData['LocalID'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjInventoryData['ItemID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.InventoryData = newObjInventoryData;
        return pos - startPos;
    }
}
exports.RemoveTaskInventoryMessage = RemoveTaskInventoryMessage;
//# sourceMappingURL=RemoveTaskInventory.js.map