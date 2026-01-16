import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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

          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
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
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-20" />
                  <p className="text-xl">Выберите чат для начала общения</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeView === 'profile' && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-card rounded-2xl p-8 border border-border">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                  АИ
                </AvatarFallback>
              </Avatar>
              {!profileEdit ? (
                <>
                  <h2 className="text-2xl font-bold mb-2">{profileName}</h2>
                  <p className="text-muted-foreground mb-4">{profileBio}</p>
                  <Button onClick={() => setProfileEdit(true)} className="bg-primary hover:bg-primary/90">
                    <Icon name="Edit" size={18} className="mr-2" />
                    Редактировать профиль
                  </Button>
                </>
              ) : (
                <div className="w-full space-y-4">
                  <div>
                    <Label htmlFor="profile-name">Имя</Label>
                    <Input
                      id="profile-name"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="mt-2 bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile-bio">О себе</Label>
                    <Input
                      id="profile-bio"
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      className="mt-2 bg-secondary border-border"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveProfile} className="flex-1 bg-primary hover:bg-primary/90">
                      Сохранить
                    </Button>
                    <Button
                      onClick={() => setProfileEdit(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={20} className="text-muted-foreground" />
                  <span>+7 900 123-45-67</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-muted-foreground" />
                  <span>alex@example.com</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={20} className="text-muted-foreground" />
                  <span>Москва, Россия</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'settings' && (
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Настройки</h1>
            
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">Уведомления</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Звук сообщений</p>
                      <p className="text-sm text-muted-foreground">Воспроизводить звук при получении</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push-уведомления</p>
                      <p className="text-sm text-muted-foreground">Показывать уведомления на устройстве</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Предпросмотр сообщений</p>
                      <p className="text-sm text-muted-foreground">Показывать текст в уведомлениях</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">Приватность</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Последняя активность</p>
                      <p className="text-sm text-muted-foreground">Кто может видеть когда я был онлайн</p>
                    </div>
                    <Button variant="outline" size="sm">Все</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Статус "онлайн"</p>
                      <p className="text-sm text-muted-foreground">Показывать когда я в сети</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Чтение сообщений</p>
                      <p className="text-sm text-muted-foreground">Отправлять статус прочтения</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">Внешний вид</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Темная тема</p>
                      <p className="text-sm text-muted-foreground">Использовать темное оформление</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Размер шрифта</p>
                      <p className="text-sm text-muted-foreground">Выберите размер текста</p>
                    </div>
                    <Button variant="outline" size="sm">Средний</Button>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">Звонки</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Входящие звонки</p>
                      <p className="text-sm text-muted-foreground">Разрешить входящие звонки</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Видеозвонки</p>
                      <p className="text-sm text-muted-foreground">Разрешить видеозвонки</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'blocked' && (
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Черный список</h1>
            
            {blockedContacts.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Ban" size={64} className="mx-auto mb-4 opacity-20" />
                <p className="text-xl text-muted-foreground">Черный список пуст</p>
                <p className="text-muted-foreground mt-2">Здесь будут контакты, которых вы заблокировали</p>
              </div>
            ) : (
              <div className="space-y-3">
                {blockedContacts.map(contact => (
                  <div
                    key={contact.id}
                    className="bg-card rounded-lg p-4 border border-border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-destructive/20 text-destructive font-semibold">
                          {contact.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">Заблокирован</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => unblockContact(contact.id)}
                    >
                      <Icon name="UserCheck" size={18} className="mr-2" />
                      Разблокировать
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
