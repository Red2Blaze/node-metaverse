// This file has been automatically generated by writeMessageClasses.js

import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class TallyVotesMessage implements MessageBase
{
    name = 'TallyVotes';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.TallyVotes;


    getSize(): number
    {
        return 0;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        return 0;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        return 0;
    }
}

