# Toucan Backend
## Overview
This is the backend for our to-do list application Toucan. We utilized MongoDB, Mongoose, bcryptjs, and Express to build a RESTful API with full CRUD functionality.

## User
### Model
This model has a fairly simple Schema:
```
userName: { type: String, required: true, index: { unique: true } },
password: { type: String, required: true },
toDoList: { ref: 'List', type: mongoose.Schema.Types.ObjectId }
```

In addition to this we also used bcryptjs to hash and authenticate user passwords.

### Controller
| URL | HTTP Verb | Action | Returns |
| ----------- | ----------- | ----------- | ----------- |
| /users | GET | Fetches all users | Array of Users|
| /users/login | GET | Attempts to Login the User | User Name and List ID's |
| /users | POST | Create new User | User Name and List ID's|
| /users/:id | PUT | Update User Data | User Name and List ID's |
| /users | DELETE | Delete user | "User Deleted" |

## List
### Model
The List Schema is quite simple:
```
title: String,
toDoItems: [toDoItem]
```
toDoItem is a subschema:
```
name: String,
priority: Number
```
(Priority is not currently being utilized)

### Controller
| URL | HTTP Verb | Action | Returns |
| ----------- | ----------- | ----------- | ----------- |
| /lists | GET | Fetches all lists | Array of lists |
| /lists/:id | GET | Fetches list by ID | List |
| /lists/:id | POST | Adds new task to list | added task|
| /lists/:id | PUT | Update list by ID | added item |
| /lists/:listId/:taskId | DELETE | Delete a task by ID of both the task and list | Updated List |