import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

type ProfileViewProps = {
  profileEdit: boolean;
  setProfileEdit: (edit: boolean) => void;
  profileName: string;
  setProfileName: (name: string) => void;
  profileBio: string;
  setProfileBio: (bio: string) => void;
  saveProfile: () => void;
};

const ProfileView = ({
  profileEdit,
  setProfileEdit,
  profileName,
  setProfileName,
  profileBio,
  setProfileBio,
  saveProfile,
}: ProfileViewProps) => {
  return (
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
  );
};

export default ProfileView;
