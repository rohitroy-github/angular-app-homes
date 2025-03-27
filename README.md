# Smart Contact Manager

**Smart Contact Manager** is a Spring Boot-based application that helps users manage their personal and professional contacts with ease. It features secure user authentication and provides a seamless interface to add, update, delete, and view contacts.

## Features

- **User Management**: Create, update, and manage user profiles.
- **Contact Management**: Add, edit, delete, and list contacts.
- **Authentication and Authorization**: Secure login and user verification.
- **RESTful APIs**: Easy integration with other systems.
- **Search and Filter**: Quickly find contacts by name, email, or phone number.
- **Profile Management**: Update personal information, profile picture, and settings.

---

## Tech Stack

- **Backend**: Spring Boot
- **Database**: MySQL
- **Frontend**: Thymeleaf
- **Build Tool**: Maven
- **Language**: Java
- **ORM**: JPA / Hibernate

---

## Snapshots  

| ![Home1](https://github.com/user-attachments/assets/c92ed67d-15b8-428c-9116-a5d3101aa0e0) | ![Home2](https://github.com/user-attachments/assets/20b1e92d-c9d1-4d98-86f1-79db5f8ec185) |
|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| ![Home3](https://github.com/user-attachments/assets/add08608-ad9c-4842-a14d-b903812cc9bb) |  |

---

## Getting Started

### Prerequisites

- **Java**: JDK 11 or higher
- **MySQL**: Installed and running
- **Maven**: Installed
- **IDE**: IntelliJ IDEA, Eclipse, or any Java IDE 

### Installation

- First, clone the repository to your local system using the following command:

```
git clone <repository-url>
```

- Navigate into the project directory using the cd command:

```
cd scm
```

- Install the required frontend dependencies for the project by running:

```
npm install
```

- Create a new database named scm_db by running the following SQL command:

```
CREATE DATABASE scm_db;
```

- Make a copy of the [.env.example] file and name it [.env] and open the [.env] file and replace all the placeholder values (like GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, etc.) with your actual credentials.

- Run the Spring Boot application. Start the project using Maven by running: 

```
./mvnw spring-boot:run
```

- Once the application is running, open your browser and go to the following URL:

```
http://localhost:8081
```