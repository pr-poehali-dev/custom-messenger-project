import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ChatSidebar from '@/components/ChatSidebar';
import ChatWindow from '@/components/ChatWindow';
import ProfileView from '@/components/ProfileView';
import SettingsView from '@/components/SettingsView';

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

type Contact = {
  id: number;
  name: string;
  avatar: string;
  blocked: boolean;
};

const Index = () => {
  const [activeView, setActiveView] = useState<'chats' | 'profile' | 'settings' | 'blocked'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileName, setProfileName] = useState('Александр Иванов');
  const [profileBio, setProfileBio] = useState('Разработчик | Москва');

  const [chats] = useState<Chat[]>([
    { id: 1, name: 'Мария Петрова', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, avatar: 'МП', type: 'personal', online: true },
    { id: 2, name: 'Команда разработки', lastMessage: 'Завтра созвон в 10:00', time: '13:15', unread: 5, avatar: 'КР', type: 'group' },
    { id: 3, name: 'Дизайн-чат', lastMessage: 'Новые макеты готовы', time: '12:48', unread: 0, avatar: 'ДЧ', type: 'group' },
    { id: 4, name: 'Новости технологий', lastMessage: 'Выпуск React 19', time: '11:20', unread: 12, avatar: 'НТ', type: 'channel' },
    { id: 5, name: 'Иван Сидоров', lastMessage: 'Отлично, спасибо!', time: 'вчера', unread: 0, avatar: 'ИС', type: 'personal', online: false },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', time: '14:30', sender: 'them' },
    { id: 2, text: 'Привет! Всё отлично, работаю над новым проектом', time: '14:31', sender: 'me' },
    { id: 3, text: 'Круто! Расскажешь подробнее?', time: '14:32', sender: 'them' },
  ]);

  const [blockedContacts, setBlockedContacts] = useState<Contact[]>([
    { id: 1, name: 'Спамер Спамович', avatar: 'СС', blocked: true },
    { id: 2, name: 'Надоедливый Человек', avatar: 'НЧ', blocked: true },
  ]);

  const emojis = ['😀', '😂', '❤️', '👍', '🔥', '✨', '🎉', '💯', '😊', '🚀', '👌', '💪'];

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        sender: 'me',
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const unblockContact = (contactId: number) => {
    setBlockedContacts(blockedContacts.filter(c => c.id !== contactId));
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const saveProfile = () => {
    setProfileEdit(false);
  };

  return (
    <div className="h-screen flex bg-background">
      <div className="w-20 bg-sidebar flex flex-col items-center py-6 border-r border-sidebar-border">
        <div className="mb-8">
          <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 ring-primary transition-all">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">АИ</AvatarFallback>
          </Avatar>
        </div>
        
        <nav className="flex-1 flex flex-col gap-6">
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 ${activeView === 'chats' ? 'bg-sidebar-accent text-primary' : 'text-sidebar-foreground'}`}
            onClick={() => setActiveView('chats')}
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 ${activeView === 'profile' ? 'bg-sidebar-accent text-primary' : 'text-sidebar-foreground'}`}
            onClick={() => setActiveView('profile')}
          >
            <Icon name="User" size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 ${activeView === 'settings' ? 'bg-sidebar-accent text-primary' : 'text-sidebar-foreground'}`}
            onClick={() => setActiveView('settings')}
          >
            <Icon name="Settings" size={24} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 ${activeView === 'blocked' ? 'bg-sidebar-accent text-primary' : 'text-sidebar-foreground'}`}
            onClick={() => setActiveView('blocked')}
          >
            <Icon name="Ban" size={24} />
          </Button>
        </nav>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12 text-sidebar-foreground">
              <Icon name="UserPlus" size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Создать группу</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="group-name" className="text-foreground">Название группы</Label>
                <Input id="group-name" placeholder="Введите название..." className="mt-2 bg-secondary border-border text-foreground" />
              </div>
              <div>
                <Label className="text-foreground">Добавить участников</Label>
                <Input placeholder="Поиск контактов..." className="mt-2 bg-secondary border-border text-foreground" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Создать группу
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {activeView === 'chats' && (
        <>
          <ChatSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredChats={filteredChats}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
          <ChatWindow
            selectedChat={selectedChat}
            messages={messages}
            messageText={messageText}
            setMessageText={setMessageText}
            sendMessage={sendMessage}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            emojis={emojis}
          />
        </>
      )}

      {activeView === 'profile' && (
        <ProfileView
          profileEdit={profileEdit}
          setProfileEdit={setProfileEdit}
          profileName={profileName}
          setProfileName={setProfileName}
          profileBio={profileBio}
          setProfileBio={setProfileBio}
          saveProfile={saveProfile}
        />
      )}

      {(activeView === 'settings' || activeView === 'blocked') && (
        <SettingsView
          activeView={activeView}
          blockedContacts={blockedContacts}
          unblockContact={unblockContact}
        />
      )}
    </div>
  );
};

export default Index;
