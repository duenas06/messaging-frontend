'use client';
import React, { useState } from 'react';
import '@sendbird/uikit-react/dist/index.css';
import '../../app/globals.css';
import { Channel, ChannelList, ChannelSettings } from '@sendbird/uikit-react';
import type { BaseMessage, MessageListParams } from '@sendbird/chat/message';
import { GroupChannel, GroupChannelCreateParams } from '@sendbird/chat/groupChannel';
import SendbirdChat, { User } from '@sendbird/chat';
import { useMutation } from '@apollo/client';
import { CREATE_CHANNEL, CREATE_USER } from '@/services/GraphQL/mutations';
import { APP_ID } from '@/constants/const';
import { OpenChannelModule, SendbirdOpenChat } from '@sendbird/chat/openChannel';

const Chat = () => {
  const sb = SendbirdChat.init({
    appId: APP_ID,
    modules: [new OpenChannelModule()],
  }) as SendbirdOpenChat;

  const [currentChannel, setCurrentChannel] = useState({ url: '' });
  const currentChannelUrl = currentChannel ? currentChannel.url : '';
  const [showSettings, setShowSettings] = useState(false);
  var channelChatDiv = document.getElementsByClassName('channel-chat') as HTMLCollectionOf<HTMLElement>;

  const renderSettingsBar = () => {
    channelChatDiv[0].style.width = '76%';
    channelChatDiv[0].style.cssFloat = 'left';
  };

  const hideSettingsBar = () => {
    channelChatDiv[0].style.width = '90%';
    channelChatDiv[0].style.cssFloat = 'right';
  };

  const [createUser] = useMutation(CREATE_USER);
  const [createChannel] = useMutation(CREATE_CHANNEL);

  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      {/* <SendbirdApp appId={APP_ID} userId={USER_ID} /> */}

      <div className="channel-wrap">
        <div className="channel-list">
          <ChannelList
            onBeforeCreateChannel={(selectedUsers) => {
              const params: GroupChannelCreateParams = { invitedUserIds: selectedUsers, name: sb.currentUser?.nickname };

              console.log(selectedUsers);
              return params;
            }}
            allowProfileEdit={true}
            disableAutoSelect={false}
            disableUserProfile={false}
            onProfileEditSuccess={async (user: User) => {
              await createUser({
                variables: {
                  input: {
                    userId: user.userId,
                    nickname: user.nickname,
                    profileUrl: user.profileUrl,
                    deleted: false,
                  },
                },
              }).then((res) => console.log(res.data));
            }}
            onChannelSelect={async (channel: GroupChannel) => {
              const params: MessageListParams = {
                prevResultSize: 200,
                nextResultSize: 200,
                // ...
              };
              const messages: BaseMessage[] = await channel.getMessagesByTimestamp(1701388800, params);
              const data: Array<BaseMessage> = [];
              messages.map((val) => data.push(val));
              const members = channel.members.map((member) => {
                member.userId;
              });
              await createChannel({
                variables: {
                  input: {
                    channelUrl: channel.url,
                    chatmates: members,
                    createdBy: channel.creator?.userId,
                    totalMessages: data.length,
                    deleted: false,
                  },
                },
              }).then((res) => console.log(res.data));
              setCurrentChannel({ ...currentChannel, url: channel.url });
            }}
          />
        </div>
        <div className="channel-chat">
          <Channel
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(!showSettings);
              renderSettingsBar();
            }}
          />
        </div>
        {showSettings && (
          <div className="channel-settings">
            <ChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
                hideSettingsBar();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
