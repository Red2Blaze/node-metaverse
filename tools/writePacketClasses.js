const messages = require('./msg_template.json');
const path = require('path');
const fs = require('fs');

messages.forEach((message) =>
{
    let classString = '// This file has been automatically generated by writePacketClasses.js\n\n';

    //First import required classes
    let uuid = false;
    let ipaddr = false;
    let vector3 = false;
    let vector4 = false;
    let long = false;
    let quaternion = false;
    message.blocks.forEach((block) =>
    {
        block.params.forEach((param) =>
        {
            switch(param.type)
            {
                case 'BOOL':
                case 'U32':
                case 'S32':
                case 'S8':
                case 'U8':
                case 'U16':
                case 'S16':
                case 'F32':
                case 'F64':
                case "IPPORT":
                case "Fixed":
                case 'Variable':
                    break;
                case "LLVector3d":
                    vector3 = true;
                    break;
                case "LLVector3":
                    vector3 = true;
                    break;
                case "LLVector4":
                    vector4 = true;
                    break;
                case "LLQuaternion":
                    quaternion = true;
                    break;
                case "LLUUID":
                    uuid = true;
                    break;
                case "IPADDR":
                    ipaddr = true;
                    break;
                case "U64":
                    long = true;
                    break;
                default:
                    console.log("UNKNOWN TYPE: "+param.type);
            }
        });
    });
    if (uuid)
    {
        classString += 'import {UUID} from \'../UUID\';\n'
    }
    if (ipaddr)
    {
        classString += 'import {IPAddress} from \'../IPAddress\';\n'
    }
    if (vector3)
    {
        classString += 'import {Vector3} from \'../Vector3\';\n'
    }
    if (vector4)
    {
        classString += 'import {Vector4} from \'../Vector4\';\n'
    }
    if (long)
    {
        classString += 'import Long = require(\'long\');\n'
    }
    if (quaternion)
    {
        classString += 'import {Quaternion} from \'../Quaternion\';\n'
    }
    classString += 'import {MessageFlags} from \'../../enums/MessageFlags\';\n' +
        'import {Packet} from \'../Packet\';\n\n';

    classString += 'export class ' + message.name + 'Packet implements Packet\n';
    classString += '{\n';
    classString += '    name = \''+message.name+'\';\n';


    let flags = [];
    message.flags.forEach((flag) =>
    {
       switch(flag.toUpperCase())
       {
           case 'TRUSTED':
               flags.push('MessageFlags.Trusted');
               break;
           case 'UDPDEPRECATED':
           case 'DEPRECATED':
               flags.push('MessageFlags.Deprecated');
               break;
           case 'ZEROCODED':
               flags.push('MessageFlags.Zerocoded');
               break;
           case 'UNENCODED':
               break;
           case 'NOTTRUSTED':
               break;
           case 'UDPBLACKLISTED':
               flags.push('MessageFlags.Blacklisted');
               break;
           default:
               console.log("UNKNOWN FLAG: "+flag);
               break;

       }
    });
    let id = parseInt(message.id);
    switch(message.frequency)
    {
        case 'Low':
            id += 4294901760;
            flags.push('MessageFlags.FrequencyLow');
            break;
        case 'Medium':
            id += 65280;
            flags.push('MessageFlags.FrequencyMedium');
            break;
        case 'Fixed':
            flags.push('MessageFlags.FrequencyFixed');
            break;
        case 'High':
            flags.push('MessageFlags.FrequencyHigh');
            break;
        default:
            console.log("UNKNOWN FREQUENCY: "+message.frequency);
            break;
    }
    classString += '    flags = ' + flags.join(' | ')+';\n';




    classString += '    id = ' + id+';\n';
    classString += '\n';

    let messageFixedSize = 0;
    let messageVariableSize = [];
    let calcVarVar = false;

    message.blocks.forEach((block) =>
    {
        classString += '    '+block.name+': {\n';

        let blockFixedSize = 0;
        let blockVariableSize = [];


        block.params.forEach((param) =>
        {
            classString += '        '+param.name+': ';
            let jstype = 'string';
            switch(param.type)
            {
                case 'LLUUID':
                    jstype = 'UUID';
                    blockFixedSize += 16;
                    break;
                case 'F32':
                case 'S32':
                case 'U32':
                    blockFixedSize += 4;
                    jstype = 'number';
                    break;
                case 'IPPORT':
                case 'S16':
                case 'U16':
                    blockFixedSize += 2;
                    jstype = 'number';
                    break;
                case 'U64':
                case 'S64':
                    jstype = 'Long';
                    blockFixedSize += 8;
                    break;
                case 'F64':
                    blockFixedSize += 8;
                    jstype = 'number';
                    break;
                case 'S8':
                case 'U8':
                    blockFixedSize += 1;
                    jstype = 'number';
                    break;
                case 'BOOL':
                    blockFixedSize += 1;
                    jstype = 'boolean';
                    break;
                case 'Variable':
                    jstype = 'string';

                    if (block.type === 'Single')
                    {
                        blockVariableSize.push('this.' + block.name + '[\'' + param.name + '\'].length + ' + param.size);
                    }
                    else
                    {
                        //Variable parameter in variable or multi block - tricky edge case
                        blockVariableSize.push('this.calculateVarVarSize(this.'+block.name+', \''+param.name+'\', '+param.size+')')
                        calcVarVar = true;
                    }
                    break;
                case 'LLVector4':
                    blockFixedSize += 16;
                    jstype = 'Vector4';
                    break;
                case 'LLQuaternion':
                    // because it's always a unit quaternion, transmitted in messages as a triplet of floats, 12 bytes wide (represented in memory as a quad of floats, 16 bytes wide)
                    blockFixedSize += 12;
                    jstype = 'Quaternion';
                    break;
                case 'LLVector3d':
                    blockFixedSize += 24;
                    jstype = 'Vector3';
                    break;
                case 'LLVector3':
                    blockFixedSize += 12;
                    jstype = 'Vector3';
                    break;
                case 'IPADDR':
                    blockFixedSize += 4;
                    jstype = 'IPAddress';
                    break;
                case 'Fixed':
                    blockFixedSize += parseInt(param.size);
                    jstype = 'Buffer';
                    break;
                default:
                    console.log('Unknown type: '+param.type);
            }
            classString += jstype + ';\n';
        });

        if (block.type === 'Single')
        {
            messageFixedSize += blockFixedSize;
            if (blockVariableSize.length > 0)
            {
                messageVariableSize.push('(' + blockVariableSize.join(' + ') + ')');
            }
        }
        else if (block.type === 'Multiple')
        {
            messageFixedSize += blockFixedSize * block.count;
            if (blockVariableSize.length > 0)
            {
                messageVariableSize.push('((' + blockVariableSize.join(' + ') + ') * ' + block.count + ')');
            }
        }
        else if (block.type === 'Variable')
        {
            messageFixedSize += 1; //variable block starts with a U8
            if (blockFixedSize > 0)
            {
                blockVariableSize.push(blockFixedSize);
            }
            if (blockVariableSize.length > 0)
            {
                messageVariableSize.push('((' + blockVariableSize.join(' + ') + ') * this.' + block.name + '.length)');
            }
        }

        switch(block.type)
        {
            case 'Single':
                classString += '    };\n';
                break;
            case 'Variable':
            case 'Multiple':
                classString += '    }[];\n';

                break;
            default:
                console.log("Unknown type: "+block.type);
        }
    });

    classString+='\n';
    classString+='    getSize(): number\n';
    classString+='    {\n';
    if (messageFixedSize > 0)
    {
        messageVariableSize.push(messageFixedSize);
    }
    if (messageVariableSize.length === 0)
    {
        classString += '        return 0;\n';
    }
    else
    {
        classString += '        return ' + messageVariableSize.join(' + ') + ';\n';
    }
    classString+='    }\n';
    classString+='\n';
    if (calcVarVar)
    {
        classString+='    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number\n' +
            '    {\n' +
            '        let size = 0;\n' +
            '        block.forEach((bl: any) =>\n' +
            '        {\n' +
            '            size += bl[paramName].length + extraPerVar;\n' +
            '        });\n' +
            '        return size;\n' +
            '    }\n\n';
    }

    classString+='     writeToBuffer(buf: Buffer, pos: number): number\n';
    classString+='     {\n';
    if (message.blocks.length > 0)
    {
        classString += '         const startPos = pos;\n';

        let firstCount = true;

        let letConst      = 'const';
        let varBlockCount = 0;
        message.blocks.forEach((block) =>
        {
            if (block.type === 'Variable' || block.type === 'Multiple')
            {
                varBlockCount++;
            }
        });
        if (varBlockCount > 1)
        {
            letConst = 'let';
        }

        message.blocks.forEach((block) =>
        {
            let single     = false;
            let blockIndex = '';
            if (block.type === 'Variable')
            {
                let first = '';
                if (firstCount)
                {
                    firstCount = false;
                    first      = letConst + ' ';
                }
                blockIndex = '         ' + first + 'count = this.' + block.name + '.length;\n';
                blockIndex += '         buf.writeUInt8(this.' + block.name + '.length, pos++);\n';
            }
            else if (block.type === 'Multiple')
            {
                let first = '';
                if (firstCount)
                {
                    firstCount = false;
                    first      = letConst + ' ';
                }
                blockIndex = '         ' + first + 'count = ' + block.count + ';\n';
            }
            else
            {
                single = true;
            }
            let spaces = '';
            if (!single)
            {
                spaces = '    ';
                classString += blockIndex;
                classString += '         for (let i = 0; i < count; i++)\n';
                classString += '         {\n';
            }
            block.params.forEach((param) =>
            {
                let val = '';
                if (!single)
                {
                    val = 'this.' + block.name + '[i][\'' + param.name + '\']';
                }
                else
                {
                    val = 'this.' + block.name + '[\'' + param.name + '\']';
                }
                switch (param.type)
                {
                    case 'LLUUID':
                        classString += spaces + '         ' + val + '.writeToBuffer(buf, pos);\n';
                        classString += spaces + '         pos += 16;\n';
                        break;
                    case 'F32':
                        classString += spaces + '         buf.writeFloatLE(' + val + ', pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        break;
                    case 'S32':
                        classString += spaces + '         buf.writeInt32LE(' + val + ', pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        break;
                    case 'U32':
                        classString += spaces + '         buf.writeUInt32LE(' + val + ', pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        break;
                    case 'U16':
                    case 'IPPORT':
                        classString += spaces + '         buf.writeUInt16LE(' + val + ', pos);\n';
                        classString += spaces + '         pos += 2;\n';
                        break;
                    case 'S16':
                        classString += spaces + '         buf.writeInt16LE(' + val + ', pos);\n';
                        classString += spaces + '         pos += 2;\n';
                        break;
                    case 'U64':
                    case 'S64':
                        classString += spaces + '         buf.writeInt32LE(' + val + '.low, pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        classString += spaces + '         buf.writeInt32LE(' + val + '.high, pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        break;
                    case 'F64':
                        classString += spaces + '         buf.writeDoubleLE(' + val + ', pos);\n';
                        classString += spaces + '         pos += 8;\n';
                        break;
                    case 'S8':
                        classString += spaces + '         buf.writeInt8(' + val + ', pos++);\n';
                        break;
                    case 'U8':
                        classString += spaces + '         buf.writeUInt8(' + val + ', pos++);\n';
                        break;
                    case 'BOOL':
                        classString += spaces + '         buf.writeUInt8((' + val + ') ? 1 : 0, pos++);\n';
                        break;
                    case 'Variable':
                        if (param.size === 1)
                        {
                            classString += spaces + '         buf.writeUInt8(' + val + '.length, pos++);\n';
                        }
                        if (param.size === 2)
                        {
                            classString += spaces + '         buf.writeUInt16BE(' + val + '.length, pos);\n';
                            classString += spaces + '         pos += 2;\n';
                        }
                        classString += spaces + '         buf.write(' + val + ', pos);\n';
                        classString += spaces + '         pos += ' + val + '.length;\n';
                        break;
                    case 'LLVector4':
                        classString += spaces + '         ' + val + '.writeToBuffer(buf, pos);\n';
                        classString += spaces + '         pos += 16;\n';
                        break;
                    case 'LLQuaternion':
                        classString += spaces + '         ' + val + '.writeToBuffer(buf, pos);\n';
                        classString += spaces + '         pos += 12;\n';
                        break;
                    case 'LLVector3d':
                        classString += spaces + '         ' + val + '.writeToBuffer(buf, pos, true);\n';
                        classString += spaces + '         pos += 24;\n';
                        break;
                    case 'LLVector3':
                        classString += spaces + '         ' + val + '.writeToBuffer(buf, pos, false);\n';
                        classString += spaces + '         pos += 12;\n';
                        break;
                    case 'IPADDR':
                        classString += spaces + '         ' + val + '.writeToBuffer(buf, pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        break;
                    case 'Fixed':
                        classString += spaces + '         ' + val + '.copy(buf, pos);\n';
                        classString += spaces + '         pos += ' + param.size + ';\n';
                        break;
                    default:
                        console.log('Unknown type: ' + param.type);
                }
            });
            if (!single)
            {
                classString += '         }\n';
            }

        });
        classString += '         return pos - startPos;\n';
    }
    else
    {
        classString += '         return 0;\n';
    }
    classString +='     }\n';
    classString +='\n';
    classString+='     readFromBuffer(buf: Buffer, pos: number): number\n';
    classString+='     {\n';
    if (message.blocks.length > 0)
    {
        classString += '         const startPos = pos;\n';

        let firstCount = true;

        let letConst      = 'const';
        let varBlockCount = 0;
        message.blocks.forEach((block) =>
        {
            if (block.type === 'Variable' || block.type === 'Multiple')
            {
                varBlockCount++;
            }
        });
        if (varBlockCount > 1)
        {
            letConst = 'let';
        }

        let varBlockConst = 'const';
        if (message.blocks.count > 1)
        {
            varBlockConst = 'let';
        }
        let firstBlock = true;

        message.blocks.forEach((block) =>
        {
            let single     = false;
            let blockIndex = '';
            if (block.type === 'Variable')
            {
                let first = '';
                if (firstCount)
                {
                    firstCount = false;
                    first      = letConst + ' ';
                }
                blockIndex = '         ' + first + 'count = buf.readUInt8(pos++);\n';
                blockIndex += '         this.' + block.name + ' = [];\n';
            }
            else if (block.type === 'Multiple')
            {
                let first = '';
                if (firstCount)
                {
                    firstCount = false;
                    first      = letConst + ' ';
                }
                blockIndex = '         ' + first + 'count = ' + block.count + ';\n';
                blockIndex += '         this.' + block.name + ' = [];';
            }
            else
            {
                single = true;
            }
            let spaces = '';
            let decl = '';
            if (firstBlock)
            {
                firstBlock = false;
                decl = varBlockConst + ' ';
            }
            if (!single)
            {
                spaces = '    ';
                classString += blockIndex;
                classString += '         for (let i = 0; i < count; i++)\n';
                classString += '         {\n';
                classString += '             const newObj' + block.name + ': {\n';
            }
            else
            {
                classString += '         const newObj' + block.name + ': {\n';
            }
            const paramTypes = [];
            const paramValues = [];
            block.params.forEach((param) =>
            {
                let jstype = 'string';
                let jsvalue = '\'\'';
                switch(param.type)
                {
                    case 'LLUUID':
                        jstype = 'UUID';
                        jsvalue = 'UUID.zero()';
                        break;
                    case 'F32':
                    case 'S32':
                    case 'U32':
                        jstype = 'number';
                        jsvalue = '0';
                        break;
                    case 'IPPORT':
                    case 'S16':
                    case 'U16':
                        jstype = 'number';
                        jsvalue = '0';
                        break;
                    case 'U64':
                    case 'S64':
                        jstype = 'Long';
                        jsvalue = 'Long.ZERO';
                        break;
                    case 'F64':
                        jstype = 'number';
                        jsvalue = '0';
                        break;
                    case 'S8':
                    case 'U8':
                        jstype = 'number';
                        jsvalue = '0';
                        break;
                    case 'BOOL':
                        jstype = 'boolean';
                        jsvalue = 'false';
                        break;
                    case 'Variable':
                        jstype = 'string';
                        jsvalue = '\'\'';
                        break;
                    case 'LLVector4':
                        jstype = 'Vector4';
                        jsvalue = 'Vector4.getZero()';
                        break;
                    case 'LLQuaternion':
                        jstype = 'Quaternion';
                        jsvalue = 'Quaternion.getIdentity()';
                        break;
                    case 'LLVector3d':
                        jstype = 'Vector3';
                        jsvalue = 'Vector3.getZero()';
                        break;
                    case 'LLVector3':
                        jstype = 'Vector3';
                        jsvalue = 'Vector3.getZero()';
                        break;
                    case 'IPADDR':
                        jstype = 'IPAddress';
                        jsvalue = 'IPAddress.zero()';
                        break;
                    case 'Fixed':
                        jstype = 'Buffer';
                        jsvalue = 'Buffer.allocUnsafe(0)';
                        break;
                    default:
                        console.log('Unknown type: '+param.type);
                }
                paramTypes.push(spaces + '             ' + param.name + ': '+jstype);
                paramValues.push(spaces + '             ' + param.name + ': '+jsvalue);
            });
            classString += paramTypes.join(',\n')+'\n';
            classString += spaces + '         } = {\n';
            classString += paramValues.join(',\n')+'\n';
            classString += spaces + '         };\n';
            block.params.forEach((param) =>
            {
                let val = '';
                switch (param.type)
                {
                    case 'LLUUID':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = new UUID(buf, pos);\n';
                        classString += spaces + '         pos += 16;\n';
                        break;
                    case 'F32':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.readFloatLE(pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        break;
                    case 'S32':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.readInt32LE(pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        break;
                    case 'U32':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.readUInt32LE(pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        break;
                    case 'U16':
                    case 'IPPORT':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.readUInt16LE(pos);\n';
                        classString += spaces + '         pos += 2;\n';
                        break;
                    case 'S16':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.readInt16LE(pos);\n';
                        classString += spaces + '         pos += 2;\n';
                        break;
                    case 'U64':
                    case 'S64':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));\n';
                        classString += spaces + '         pos += 8;\n';
                        break;
                    case 'F64':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.readDoubleLE(pos);\n';
                        classString += spaces + '         pos += 8;\n';
                        break;
                    case 'S8':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.readInt8(pos++);\n';
                        break;
                    case 'U8':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.readUInt8(pos++);\n';
                        break;
                    case 'BOOL':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = (buf.readUInt8(pos++) === 1);\n';
                        break;
                    case 'Variable':
                        if (param.size === 1)
                        {
                            classString += spaces + '         let length = buf.readUInt8(pos++);\n';
                        }
                        if (param.size === 2)
                        {
                            classString += spaces + '         let length = buf.readUInt16BE(pos);\n';
                            classString += spaces + '         pos += 2;\n';
                        }
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.toString(\'utf8\', pos, length);\n';
                        classString += spaces + '         pos += length;\n';
                        break;
                    case 'LLVector4':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = new Vector4(buf, pos);\n';
                        classString += spaces + '         pos += 16;\n';
                        break;
                    case 'LLQuaternion':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = new Quaternion(buf, pos);\n';
                        classString += spaces + '         pos += 12;\n';
                        break;
                    case 'LLVector3d':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = new Vector3(buf, pos, true);\n';
                        classString += spaces + '         pos += 24;\n';
                        break;
                    case 'LLVector3':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = new Vector3(buf, pos, false);\n';
                        classString += spaces + '         pos += 12;\n';
                        break;
                    case 'IPADDR':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = new IPAddress(buf, pos);\n';
                        classString += spaces + '         pos += 4;\n';
                        break;
                    case 'Fixed':
                        classString += spaces + '         newObj' + block.name + '[\'' + param.name + '\'] = buf.slice(pos, pos + ' + param.size + ');\n';
                        classString += spaces + '         pos += ' + param.size + ';\n';
                        break;
                    default:
                        console.log('Unknown type: ' + param.type);
                }
            });
            if (!single)
            {
                classString += '             this.'+block.name+'.push(newObj' + block.name + ');\n';
                classString += '         }\n';
            }
            else
            {
                classString += '         this.'+block.name+' = newObj' + block.name + ';\n';
            }


        });
        classString += '         return pos - startPos;\n';
    }
    else
    {
        classString += '         return 0;\n';
    }
    classString +='     }\n';
    classString += '}\n';
    classString +='\n';

    const p = path.join(__dirname+'/../lib/classes/packets/'+message.name+'.ts');
    fs.writeFile(p, classString, (err) =>
    {

    });

});
//Now write the Messages class
let classString = '// This file has been automatically generated by writePacketClasses.js\n\n';
messages.forEach((message) =>
{
    const name = message.name;
    classString += 'export * from \'./packets/'+name+'\';\n';
});
classString += 'import {Message} from \'../enums/Message\';\n';
classString += '\n';
classString += 'const messages: {[index: number]: string} = {};\n';
const msgs = [];
messages.forEach((message) =>
{
    msgs.push('messages[<number>Message.' + message.name + '] = \'' + message.name + 'Packet\'');
});
classString += msgs.join(';\n')+';\n';
classString += '\n';
classString += 'export function nameFromID(id: Message): string\n';
classString += '{\n';
classString += '    return messages[id];\n';
classString += '}\n';
const p = path.join(__dirname+'/../lib/classes/MessageClasses.ts');
fs.writeFile(p, classString, (err) =>
{

});

classString = 'export enum Message {\n';
const msgArr = [];
messages.forEach((message) =>
{
    let id = parseInt(message.id);
    switch(message.frequency)
    {
        case 'Low':
            id += 4294901760;
            break;
        case 'Medium':
            id += 65280;
            break;
        case 'Fixed':
            break;
        case 'High':
            break;
        default:
            console.log("UNKNOWN FREQUENCY: "+message.frequency);
            break;
    }
    msgArr.push('    '+message.name+' = '+id);
});
classString += msgArr.join(',\n')+'\n';
classString += '}\n';
const e = path.join(__dirname+'/../lib/enums/Message.ts');
fs.writeFile(e, classString, (err) =>
{

});
