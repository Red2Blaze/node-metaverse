"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
const Message_1 = require("../../enums/Message");
class ObjectMaterialMessage {
    constructor() {
        this.name = 'ObjectMaterial';
        this.messageFlags = MessageFlags_1.MessageFlags.Zerocoded | MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = Message_1.Message.ObjectMaterial;
    }
    getSize() {
        return ((5) * this.ObjectData.length) + 33;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.ObjectData.length;
        buf.writeUInt8(this.ObjectData.length, pos++);
        for (let i = 0; i < count; i++) {
            buf.writeUInt32LE(this.ObjectData[i]['ObjectLocalID'], pos);
            pos += 4;
            buf.writeUInt8(this.ObjectData[i]['Material'], pos++);
        }
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
        const count = buf.readUInt8(pos++);
        this.ObjectData = [];
        for (let i = 0; i < count; i++) {
            const newObjObjectData = {
                ObjectLocalID: 0,
                Material: 0
            };
            newObjObjectData['ObjectLocalID'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjObjectData['Material'] = buf.readUInt8(pos++);
            this.ObjectData.push(newObjObjectData);
        }
        return pos - startPos;
    }
}
exports.ObjectMaterialMessage = ObjectMaterialMessage;
//# sourceMappingURL=ObjectMaterial.js.map