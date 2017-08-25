# Fix-It App

Fix-It Tech is a full-stack web application to schedule events and manage attendance. Volunteers will register their skills and RSVP to events, which will allow administrators to match volunteers to problems and accurately schedule volunteers for upcoming events. The application will be primarily an admin-orientated application with ambitions to be more public facing in the future.

## Technologies Used

- Node
- Express
- AngularJS
- Angular Material
- PostgreSQL
- Heroku
- Google Maps API
- Google Auth Firebase
- Firebase UI
- SweetAlerts2
- HTML5
- CSS3
- Sass


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

Alec Sands, Anne Kennedy, Ben Haesemeyer, and Emily Kuplic.


## Acknowledgments

* Hat tip to anyone who's code was used
