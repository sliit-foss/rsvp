# Attendees

GET	{{domain}}/user	-	Get list of attendees
GET	{{domain}}/user/:id	-	Get a attendee by id
POST	{{domain}}/user/:id	-	Create a attendee

# Auth

POST	{{domain}}/user/login	-	Admin login
POST	{{domain}}/user/signup	-	Create a admin account

# Event

GET	{{domain}}/event	-	Get list of events
GET	{{domain}}/event/:id	-	Get a event by id
POST	{{domain}}/event/:id	-	Create a event

# Mail

POST {{domain}}/mail	-	Send mail/mails to attendee/attendees

# Health

GET	{{domain}}/health	-	Get health of the service
