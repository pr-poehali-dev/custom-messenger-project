import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

type Contact = {
  id: number;
  name: string;
  avatar: string;
  blocked: boolean;
};

type SettingsViewProps = {
  activeView: 'settings' | 'blocked';
  blockedContacts: Contact[];
  unblockContact: (contactId: number) => void;
};

const SettingsView = ({ activeView, blockedContacts, unblockContact }: SettingsViewProps) => {
  if (activeView === 'settings') {
    return (
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
    );
  }

  if (activeView === 'blocked') {
    return (
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
    );
  }

  return null;
};

export default SettingsView;
