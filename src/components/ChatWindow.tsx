import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  type: 'personal' | 'group' | 'channel';
  online?: boolean;
};

type Message = {
  id: number;
  text: string;
  time: string;
  sender: 'me' | 'them';
};

type ChatWindowProps = {
  selectedChat: Chat | null;
  messages: Message[];
  messageText: string;
  setMessageText: (text: string) => void;
  sendMessage: () => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  emojis: string[];
};

const ChatWindow = ({
  selectedChat,
  messages,
  messageText,
  setMessageText,
  sendMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  emojis,
}: ChatWindowProps) => {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-20" />
          <p className="text-xl">Выберите чат для начала общения</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
              {selectedChat.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{selectedChat.name}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedChat.online ? 'в сети' : 'был(а) недавно'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Video" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Icon name="Smile" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Paperclip" size={20} />
          </Button>
          <div className="flex-1 relative">
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 p-3 bg-card border border-border rounded-lg shadow-lg grid grid-cols-6 gap-2">
                {emojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    className="text-2xl hover:scale-125 transition-transform"
                    onClick={() => {
                      setMessageText(messageText + emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
            <Input
              placeholder="Введите сообщение..."
              className="bg-secondary border-border"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
          </div>
          <Button onClick={sendMessage} className="bg-primary hover:bg-primary/90">
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
