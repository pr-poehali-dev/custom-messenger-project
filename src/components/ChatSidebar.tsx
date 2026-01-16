import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

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

type ChatSidebarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredChats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
};

const ChatSidebar = ({ searchQuery, setSearchQuery, filteredChats, selectedChat, setSelectedChat }: ChatSidebarProps) => {
  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold mb-4">Чаты</h1>
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск чатов..."
            className="pl-10 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2 bg-secondary">
          <TabsTrigger value="all" className="flex-1">Все</TabsTrigger>
          <TabsTrigger value="personal" className="flex-1">Личные</TabsTrigger>
          <TabsTrigger value="groups" className="flex-1">Группы</TabsTrigger>
          <TabsTrigger value="channels" className="flex-1">Каналы</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {filteredChats.map(chat => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors mb-1 ${
                    selectedChat?.id === chat.id ? 'bg-secondary' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground truncate">{chat.lastMessage}</span>
                        {chat.unread > 0 && (
                          <Badge className="bg-primary text-primary-foreground ml-2">{chat.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="personal" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {filteredChats.filter(c => c.type === 'personal').map(chat => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors mb-1 ${
                    selectedChat?.id === chat.id ? 'bg-secondary' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <span className="text-sm text-muted-foreground truncate">{chat.lastMessage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="groups" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {filteredChats.filter(c => c.type === 'group').map(chat => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors mb-1 ${
                    selectedChat?.id === chat.id ? 'bg-secondary' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <span className="text-sm text-muted-foreground truncate">{chat.lastMessage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="channels" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {filteredChats.filter(c => c.type === 'channel').map(chat => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors mb-1 ${
                    selectedChat?.id === chat.id ? 'bg-secondary' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <span className="text-sm text-muted-foreground truncate">{chat.lastMessage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatSidebar;
