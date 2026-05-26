from django.contrib.auth.models import BaseUserManager



class UserManager(BaseUserManager):
    def create_user(self, firstname, lastname, email, password):
        email = self.normalize_email(email)

        user = self.model(
            firstname=firstname, lastname=lastname, email=email
        )
        user.set_password(password)
        #user.save(using=self._db)
        return user
