# Generated by Django 4.1.5 on 2023-01-25 14:16

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('points', models.PositiveIntegerField(default=0)),
                ('country', models.CharField(blank=True, choices=[('ad', 'Andorra'), ('ae', 'United Arab Emirates'), ('af', 'Afghanistan'), ('ag', 'Antigua and Barbuda'), ('ai', 'Anguilla'), ('al', 'Albania'), ('am', 'Armenia'), ('ao', 'Angola'), ('aq', 'Antarctica'), ('ar', 'Argentina'), ('as', 'American Samoa'), ('at', 'Austria'), ('au', 'Australia'), ('aw', 'Aruba'), ('ax', 'Åland Islands'), ('az', 'Azerbaijan'), ('ba', 'Bosnia and Herzegovina'), ('bb', 'Barbados'), ('bd', 'Bangladesh'), ('be', 'Belgium'), ('bf', 'Burkina Faso'), ('bg', 'Bulgaria'), ('bh', 'Bahrain'), ('bi', 'Burundi'), ('bj', 'Benin'), ('bl', 'Saint Barthélemy'), ('bm', 'Bermuda'), ('bn', 'Brunei'), ('bo', 'Bolivia'), ('bq', 'Caribbean Netherlands'), ('br', 'Brazil'), ('bs', 'Bahamas'), ('bt', 'Bhutan'), ('bv', 'Bouvet Island'), ('bw', 'Botswana'), ('by', 'Belarus'), ('bz', 'Belize'), ('ca', 'Canada'), ('cc', 'Cocos (Keeling) Islands'), ('cd', 'DR Congo'), ('cf', 'Central African Republic'), ('cg', 'Republic of the Congo'), ('ch', 'Switzerland'), ('ci', "Côte d'Ivoire (Ivory Coast)"), ('ck', 'Cook Islands'), ('cl', 'Chile'), ('cm', 'Cameroon'), ('cn', 'China'), ('co', 'Colombia'), ('cr', 'Costa Rica'), ('cu', 'Cuba'), ('cv', 'Cape Verde'), ('cw', 'Curaçao'), ('cx', 'Christmas Island'), ('cy', 'Cyprus'), ('cz', 'Czechia'), ('de', 'Germany'), ('dj', 'Djibouti'), ('dk', 'Denmark'), ('dm', 'Dominica'), ('do', 'Dominican Republic'), ('dz', 'Algeria'), ('ec', 'Ecuador'), ('ee', 'Estonia'), ('eg', 'Egypt'), ('eh', 'Western Sahara'), ('er', 'Eritrea'), ('es', 'Spain'), ('et', 'Ethiopia'), ('eu', 'European Union'), ('fi', 'Finland'), ('fj', 'Fiji'), ('fk', 'Falkland Islands'), ('fm', 'Micronesia'), ('fo', 'Faroe Islands'), ('fr', 'France'), ('ga', 'Gabon'), ('gb', 'United Kingdom'), ('gb-eng', 'England'), ('gb-nir', 'Northern Ireland'), ('gb-sct', 'Scotland'), ('gb-wls', 'Wales'), ('gd', 'Grenada'), ('ge', 'Georgia'), ('gf', 'French Guiana'), ('gg', 'Guernsey'), ('gh', 'Ghana'), ('gi', 'Gibraltar'), ('gl', 'Greenland'), ('gm', 'Gambia'), ('gn', 'Guinea'), ('gp', 'Guadeloupe'), ('gq', 'Equatorial Guinea'), ('gr', 'Greece'), ('gs', 'South Georgia'), ('gt', 'Guatemala'), ('gu', 'Guam'), ('gw', 'Guinea-Bissau'), ('gy', 'Guyana'), ('hk', 'Hong Kong'), ('hm', 'Heard Island and McDonald Islands'), ('hn', 'Honduras'), ('hr', 'Croatia'), ('ht', 'Haiti'), ('hu', 'Hungary'), ('id', 'Indonesia'), ('ie', 'Ireland'), ('il', 'Israel'), ('im', 'Isle of Man'), ('in', 'India'), ('io', 'British Indian Ocean Territory'), ('iq', 'Iraq'), ('ir', 'Iran'), ('is', 'Iceland'), ('it', 'Italy'), ('je', 'Jersey'), ('jm', 'Jamaica'), ('jo', 'Jordan'), ('jp', 'Japan'), ('ke', 'Kenya'), ('kg', 'Kyrgyzstan'), ('kh', 'Cambodia'), ('ki', 'Kiribati'), ('km', 'Comoros'), ('kn', 'Saint Kitts and Nevis'), ('kp', 'North Korea'), ('kr', 'South Korea'), ('kw', 'Kuwait'), ('ky', 'Cayman Islands'), ('kz', 'Kazakhstan'), ('la', 'Laos'), ('lb', 'Lebanon'), ('lc', 'Saint Lucia'), ('li', 'Liechtenstein'), ('lk', 'Sri Lanka'), ('lr', 'Liberia'), ('ls', 'Lesotho'), ('lt', 'Lithuania'), ('lu', 'Luxembourg'), ('lv', 'Latvia'), ('ly', 'Libya'), ('ma', 'Morocco'), ('mc', 'Monaco'), ('md', 'Moldova'), ('me', 'Montenegro'), ('mf', 'Saint Martin'), ('mg', 'Madagascar'), ('mh', 'Marshall Islands'), ('mk', 'North Macedonia'), ('ml', 'Mali'), ('mm', 'Myanmar'), ('mn', 'Mongolia'), ('mo', 'Macau'), ('mp', 'Northern Mariana Islands'), ('mq', 'Martinique'), ('mr', 'Mauritania'), ('ms', 'Montserrat'), ('mt', 'Malta'), ('mu', 'Mauritius'), ('mv', 'Maldives'), ('mw', 'Malawi'), ('mx', 'Mexico'), ('my', 'Malaysia'), ('mz', 'Mozambique'), ('na', 'Namibia'), ('nc', 'New Caledonia'), ('ne', 'Niger'), ('nf', 'Norfolk Island'), ('ng', 'Nigeria'), ('ni', 'Nicaragua'), ('nl', 'Netherlands'), ('no', 'Norway'), ('np', 'Nepal'), ('nr', 'Nauru'), ('nu', 'Niue'), ('nz', 'New Zealand'), ('om', 'Oman'), ('pa', 'Panama'), ('pe', 'Peru'), ('pf', 'French Polynesia'), ('pg', 'Papua New Guinea'), ('ph', 'Philippines'), ('pk', 'Pakistan'), ('pl', 'Poland'), ('pm', 'Saint Pierre and Miquelon'), ('pn', 'Pitcairn Islands'), ('pr', 'Puerto Rico'), ('ps', 'Palestine'), ('pt', 'Portugal'), ('pw', 'Palau'), ('py', 'Paraguay'), ('qa', 'Qatar'), ('re', 'Réunion'), ('ro', 'Romania'), ('rs', 'Serbia'), ('ru', 'Russia'), ('rw', 'Rwanda'), ('sa', 'Saudi Arabia'), ('sb', 'Solomon Islands'), ('sc', 'Seychelles'), ('sd', 'Sudan'), ('se', 'Sweden'), ('sg', 'Singapore'), ('sh', 'Saint Helena, Ascension and Tristan da Cunha'), ('si', 'Slovenia'), ('sj', 'Svalbard and Jan Mayen'), ('sk', 'Slovakia'), ('sl', 'Sierra Leone'), ('sm', 'San Marino'), ('sn', 'Senegal'), ('so', 'Somalia'), ('sr', 'Suriname'), ('ss', 'South Sudan'), ('st', 'São Tomé and Príncipe'), ('sv', 'El Salvador'), ('sx', 'Sint Maarten'), ('sy', 'Syria'), ('sz', 'Eswatini (Swaziland)'), ('tc', 'Turks and Caicos Islands'), ('td', 'Chad'), ('tf', 'French Southern and Antarctic Lands'), ('tg', 'Togo'), ('th', 'Thailand'), ('tj', 'Tajikistan'), ('tk', 'Tokelau'), ('tl', 'Timor-Leste'), ('tm', 'Turkmenistan'), ('tn', 'Tunisia'), ('to', 'Tonga'), ('tr', 'Turkey'), ('tt', 'Trinidad and Tobago'), ('tv', 'Tuvalu'), ('tw', 'Taiwan'), ('tz', 'Tanzania'), ('ua', 'Ukraine'), ('ug', 'Uganda'), ('um', 'United States Minor Outlying Islands'), ('un', 'United Nations'), ('us', 'United States'), ('uy', 'Uruguay'), ('uz', 'Uzbekistan'), ('va', 'Vatican City (Holy See)'), ('vc', 'Saint Vincent and the Grenadines'), ('ve', 'Venezuela'), ('vg', 'British Virgin Islands'), ('vi', 'United States Virgin Islands'), ('vn', 'Vietnam'), ('vu', 'Vanuatu'), ('wf', 'Wallis and Futuna'), ('ws', 'Samoa'), ('xk', 'Kosovo'), ('ye', 'Yemen'), ('yt', 'Mayotte'), ('za', 'South Africa'), ('zm', 'Zambia'), ('zw', 'Zimbabwe')], max_length=10, null=True)),
                ('tests_started', models.PositiveSmallIntegerField(default=0)),
                ('tests_completed', models.PositiveSmallIntegerField(default=0)),
                ('level', models.CharField(choices=[('beginner', 'beginner'), ('intermediate', 'intermediate'), ('advanced', 'advanced'), ('realOtaku', 'realOtaku')], default='beginner', max_length=12)),
            ],
            options={
                'ordering': ['-points'],
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('anime_name', models.CharField(max_length=50, unique=True)),
                ('active', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField(max_length=350)),
                ('choice1', models.CharField(max_length=150)),
                ('choice2', models.CharField(max_length=150)),
                ('choice3', models.CharField(max_length=150)),
                ('right_answer', models.CharField(max_length=150)),
                ('active', models.BooleanField(default=False)),
                ('anime', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='anime_questions', to='otakus.anime')),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='QuestionInteraction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('correct_answer', models.BooleanField(default=None, null=True)),
                ('anime', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='anime_interactions', to='otakus.anime')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_interactions', to='otakus.question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions_interacted_with', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notification', models.CharField(max_length=250)),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('seen', models.BooleanField(default=False)),
                ('kind', models.CharField(blank=True, choices=[('NA', 'new available anime in quizes'), ('N', 'new anime to review'), ('R', 'review needed'), ('A', 'question approved'), ('F', 'question rejected')], max_length=2, null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='getnotifications', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Contribution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('approved', models.BooleanField(default=None, null=True)),
                ('reviewer_feedback', models.CharField(blank=True, choices=[('irrelevant', 'not relevant'), ('easy', 'too easy'), ('bad_choices', 'bad choices'), ('invalid', 'invalid/wrong information')], max_length=50, null=True)),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
                ('date_reviewed', models.DateTimeField(blank=True, null=True)),
                ('contributor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='contributions', to=settings.AUTH_USER_MODEL)),
                ('question', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='contribution', to='otakus.question')),
                ('reviewer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='contributions_reviewed', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='user',
            name='animes_to_review',
            field=models.ManyToManyField(blank=True, related_name='reviewers', to='otakus.anime'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
        migrations.AddConstraint(
            model_name='questioninteraction',
            constraint=models.UniqueConstraint(fields=('user', 'question'), name='user interacts with each question just once'),
        ),
        migrations.AddConstraint(
            model_name='question',
            constraint=models.UniqueConstraint(fields=('anime', 'question'), name='unique question for each anime'),
        ),
    ]
