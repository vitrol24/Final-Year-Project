from django.conf import settings
from django.db import models
from django.utils import timezone
from user.models import User





class BuildingProject(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    creation_date = models.DateTimeField(default=timezone.now)
    published = models.BooleanField(default=False)



    data = models.JSONField()
    info = models.TextField()
    location = models.CharField(
        max_length=100,
        choices = [("Chipata", "Chipata"), ("Choma", "Choma"), ("Isoka", "Isoka"), ("Kabompo", "Kabompo"), ("Kabwe", "Kabwe"), ("Kafironda", "Kafironda"), ("Kafue", "Kafue"), ("Kalabo", "Kalabo"), ("Kaoma", "Kaoma"), ("Kasama", "Kasama"), ("Kasempa", "Kasempa"), ("Kawambwa", "Kawambwa"), ("Livingstone", "Livingstone"), ("Lundazi", "Lundazi"), ("Lusaka", "Lusaka"), ("Magoye", "Magoye"), ("Mansa", "Mansa"), ("Mbala", "Mbala"), ("Mfuwe", "Mfuwe"), ("Misamfu", "Misamfu"), ("Mkushi", "Mkushi"), ("Mongu", "Mongu"), ("Mount Makulu", "Mount Makulu"), ("Mpika", "Mpika"), ("Msekera", "Msekera"), ("Mumbwa", "Mumbwa"), ("Petauke", "Petauke"), ("Samya", "Samya"), ("Senanga", "Senanga"), ("Serenje", "Serenje"), ("Sesheke", "Sesheke"), ("Solwezi", "Solwezi"), ("Zambezi", "Zambezi")]
    )
    name = models.TextField()
    simulation_results = models.JSONField(null=True)
    uuid = models.TextField()



    

