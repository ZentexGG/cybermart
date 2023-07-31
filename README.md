# Cybermart

Open-source project for an online tech store

## Table of Contents

- [Introduction](#introduction)
- [Technologies & Libraries](#technologies--libraries)
- [Features](#features)
- [Installation](#installation)
- [App Settings Fields](#app-settings-fields)

## Introduction

Cybermart is an open-source project for an online e-commerce website that caters to tech enthusiasts, professionals, and casual users seeking top-notch tech gadgets and computer components. It is a one-stop place for your tech-related purchases. The site has a user-friendly interface and also an UI for site administrators.

## Technologies & Libraries

### Backend
- C#
- ASP.NET Web API
- Entity Framework
- Identity Core
#### Database
- Microsoft SQL Server Database

### Frontend
- React
- Typescript
- TailwindCSS
#### Other libraries used
- React Icons
- React Router
- Axios
- Browser Cookies & Local Storage

## Features

The project includes all the basic features you'd find on other online stores. Here is some of them:
- Authentication
- Sessions
- Orders
- Payment
- Filtering Products
- Searching Products
- User Roles

## Installation

In order to get the project up and running, you need to follow a few steps listed below for both the backend and frontend. First, start with the [cloning the repository](#Cloning) After that, you can start with either the frontend or backend and follow the steps provided in order.

### Cloning
You can clone the repository in many different ways, listed below are some ways you can clone the repository and/or get the code inside the repository
#### Using your IDE's UI
Many IDEs have an UI for cloning a Git repo. Depending on your IDE, you might have to click on New or Open --> Get from version control or Get from remote repository
For this example, we've used Jetbrains Rider's interface
![image](https://github.com/ZentexGG/cybermart/assets/54683170/ac61e5df-d9d0-47f7-946b-872d38e761fa)
In this case, all you have to do is insert the repository URL and choose the location where you want it to be cloned on your computer.

#### Using the command line
For this method to work properly, you'll need to have [Git](https://git-scm.com/downloads) installed on your computer.
Depending on your operating system, you might already have git installed on your computer.

After installing Git, you can use the Git Bash, Windows CMD or Powershell, or any other command line tool to run the following command:
``` bash
git clone https://github.com/ZentexGG/cybermart.git
```
Or, if you have an SSH key setup

``` bash
git clone git@github.com:ZentexGG/cybermart.git
```

#### Downloading the files
It is as easy as it sounds! Once you are on the repository's page, click on the **Code** button, and then on **Download ZIP**, as showwn below
![image](https://github.com/ZentexGG/cybermart/assets/54683170/32d02fcf-7fec-41d6-b6c1-792559f08b0e)


### Frontend
**Note**: You need to have [Node.js](https://nodejs.org/en) along with NPM installed in order to get the frontend running 
1. Open a command line and navigate to the **frontend** folder.
2. Once there, use the following command and wait for the process to finish
``` bash
npm install
```
3. Once finished, use the following command to start the React development server and start the website's frontend
``` bash
npm start
```
After this, the website should come to life, however, using any of the features is not possible without the backend as well.

### Backend
The sections listed below should be followed in order.
**You can skip the first section if you already have .NET 6.0, SQL Server 2022 and SQL Server Management Studio installed on your computer**
#### Installing dependencies
1. Install [.NET 6.0 (click!)](https://dotnet.microsoft.com/en-us/download)
2. Install [Microsoft SQL Server 2022 (click!)](https://www.microsoft.com/en-us/sql-server/sql-server-downloads). The project should work on both Developer and Express versions of SQL Server
3. Install [SQL Server Management Studio (click!)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)

#### Creating a database
1. Open **SQL Server Management Studio**
2. Login using your account or Windows Authentication (depending on your install)
3. Once logged in, right click on the Databases folder and click **New Database**
4. Give the database any name you like and click **OK**

![image](https://github.com/ZentexGG/cybermart/assets/54683170/7c0cc4d5-e21a-46d4-9cdd-99d19e944dd6)

5. If everything worked until now, when you expand your Databases folder, you should see the brand new database created.

#### Configuring the appsettings.Development.json
**Note: DO NOT skip this step or the project will not be able to run properly**
The appsettings file contains the template for the variables the project should use for connecting to a database or establishing a CORS policy with the frontend, etc.

1. Navigate to the **backend** folder.
2. Open the **appsettings.json** file. Copy the contents of the file and move on to the next step
3. Create a new file called exactly: **appsettings.Development.json** and paste the content inside. This is the file that is going to be used by the app when you compile and run it.
4. Modify the fields so that they match your own project implementation.
5. **Make sure all the fields are properly entered before continuing and do not change the name of the fields themselves.**

#### Updating the database
Now that the settings part is done, we can update the database so it has all the necessary tables. For the next steps we recommend using the **dotnet CLI** but you can also use Visual Studio's UI for migrations.
**Note**: If you already have the **dotnet-ef tool** installed, you can skip step 2.

1. Open the command line and navigate to the **backend** folder.
2. Install the [dotnet-ef tool](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) using the following command:
```bash
dotnet tool install --global dotnet-ef
```
3. Update the database using the existing migrations using the following command:
``` bash
dotnet ef database update --startup-project PresentationLayer --project DataLayer
```
4. If everything works properly, your database should be updated and when you expand it in SQL Server Management Studio, you should see the following tables

![image](https://github.com/ZentexGG/cybermart/assets/54683170/85971b51-bc32-4eb0-95e3-7cfc7418fcf5)


#### Starting the project
There are two ways you can get the backend started, either using your IDE or using the dotnet CLI.
##### Using your IDE
1. Open the **backend.sln** solution file in your IDE.
2. If you're using Jetbrains Rider, on the top right you should have a run button just like this, click it and it should start, alongside the Swagger UI.
     
![image](https://github.com/ZentexGG/cybermart/assets/54683170/62a0dbe6-e776-446c-a92c-2030e8d9f0c6)

The process is similar in Visual Studio as well, you can run the PresentationLayer project using Debug x64.

##### Using the dotnet CLI
1. Using the command line, navigate to the **backend** folder and run the following command
``` bash
dotnet run --project PresentationLayer
```


