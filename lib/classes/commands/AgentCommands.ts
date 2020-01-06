import { UUID } from '../UUID';
import { AgentAnimationMessage } from '../messages/AgentAnimation';
import { PacketFlags } from '../../enums/PacketFlags';
import { CommandsBase } from './CommandsBase';
import { Vector3 } from '../Vector3';
import { Message } from '../../enums/Message';
import { Utils } from '../Utils';
import { FilterResponse } from '../../enums/FilterResponse';
import { AvatarPropertiesReplyMessage } from '../messages/AvatarPropertiesReply';
import { AvatarPropertiesRequestMessage } from '../messages/AvatarPropertiesRequest';
import { AvatarPropertiesReplyEvent } from '../../events/AvatarPropertiesReplyEvent';

export class AgentCommands extends CommandsBase
{
    private async animate(anim: UUID[], run: boolean): Promise<void>
    {

        const circuit = this.currentRegion.circuit;
        const animPacket = new AgentAnimationMessage();
        animPacket.AgentData = {
            AgentID: this.agent.agentID,
            SessionID: circuit.sessionID
        };
        animPacket.PhysicalAvatarEventList = [];
        animPacket.AnimationList = [];
        anim.forEach((a) =>
        {
            animPacket.AnimationList.push({
                AnimID: a,
                StartAnim: run
            });
        });

        return await circuit.waitForAck(circuit.sendMessage(animPacket, PacketFlags.Reliable), 10000);
    }

    async startAnimations(anim: UUID[]): Promise<void>
    {
        return await this.animate(anim, true);
    }

    async stopAnimations(anim: UUID[]): Promise<void>
    {
        return await this.animate(anim, false);
    }

    setCamera(position: Vector3, lookAt: Vector3, viewDistance?: number, leftAxis?: Vector3, upAxis?: Vector3)
    {
        this.agent.cameraCenter = position;
        this.agent.cameraLookAt = lookAt;
        if (viewDistance !== undefined)
        {
            this.agent.cameraFar = viewDistance;
        }
        if (leftAxis !== undefined)
        {
            this.agent.cameraLeftAxis = leftAxis;
        }
        if (upAxis !== undefined)
        {
            this.agent.cameraUpAxis = upAxis;
        }
        this.agent.sendAgentUpdate();
    }

    setViewDistance(viewDistance: number)
    {
        this.agent.cameraFar = viewDistance;
        this.agent.sendAgentUpdate();
    }

    async getAvatarProperties(avatarID: UUID | string): Promise<AvatarPropertiesReplyEvent>
    {
        if (typeof avatarID === 'string')
        {
            avatarID = new UUID(avatarID);
        }

        const msg: AvatarPropertiesRequestMessage = new AvatarPropertiesRequestMessage();

        msg.AgentData = {
            AgentID: this.agent.agentID,
            SessionID: this.circuit.sessionID,
            AvatarID: avatarID
        };

        this.circuit.sendMessage(msg, PacketFlags.Reliable);

        const avatarPropertiesReply: AvatarPropertiesReplyMessage = (await this.circuit.waitForMessage(Message.AvatarPropertiesReply, 10000, (packet: AvatarPropertiesReplyMessage): FilterResponse =>
        {
            const replyMessage: AvatarPropertiesReplyMessage = packet as AvatarPropertiesReplyMessage;
            if (replyMessage.AgentData.AvatarID.equals(avatarID))
            {
                return FilterResponse.Finish;
            }
            return FilterResponse.NoMatch;
        })) as AvatarPropertiesReplyMessage;

        return new class implements AvatarPropertiesReplyEvent
        {
            ImageID = avatarPropertiesReply.PropertiesData.ImageID;
            FLImageID = avatarPropertiesReply.PropertiesData.FLImageID;
            PartnerID = avatarPropertiesReply.PropertiesData.PartnerID;
            AboutText = Utils.BufferToStringSimple(avatarPropertiesReply.PropertiesData.AboutText);
            FLAboutText = Utils.BufferToStringSimple(avatarPropertiesReply.PropertiesData.FLAboutText);
            BornOn = Utils.BufferToStringSimple(avatarPropertiesReply.PropertiesData.BornOn);
            ProfileURL = Utils.BufferToStringSimple(avatarPropertiesReply.PropertiesData.ProfileURL);
            CharterMember = parseInt(Utils.BufferToStringSimple(avatarPropertiesReply.PropertiesData.CharterMember), 10); // avatarPropertiesReply.PropertiesData.CharterMember;
            Flags = avatarPropertiesReply.PropertiesData.Flags;
        };
    }
}
