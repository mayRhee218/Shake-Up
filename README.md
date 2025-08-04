# 💃Shake Up

`Online Dance Learning Platform`

__What is Shake Up?__

1. Shake your body  
2. Bring about a major change  

#### 👆Click to watch the UCC video!
[![ShakeUp Thumbnail](https://user-images.githubusercontent.com/56299114/170525394-2170f072-2a53-4351-a34e-b9953e6d2f1f.png)](https://www.youtube.com/watch?v=PecaFVn66D8)

---

## 🌈Project Overview

Do you want to dance better?  
Do you want to share videos of your dancing?

We created **Shake Up** for those who love dance!

Come enjoy dancing together with __Shake Up__!

---

#### 💫Tech Stacks & IDE ####

- ![Spring Badge] ![React Badge] ![TensorFlow Badge] ![MariaDB Badge] ![Java Badge] ![JavaScript Badge]

- ![IntelliJ IDEA Badge] ![Visual Studio Code Badge] ![Android Studio Badge]

---

#### 📅Project Duration ####

- 2022.01.10 ~ 2022.02.18

---

#### 🌟Planning Purpose ####

- Amateur dancers who have difficulty participating in offline dance classes due to COVID-19 can now learn dance online!

- Dance for fitness and health!

- Let’s create a fun service for both developers and users!

---

#### 🌟Planning Background ####

- Shows like "Street Woman Fighter" increased national interest in Korean dancers.

- General users gained interest in dance via video platforms like YouTube and TikTok.

- __Survey (2022.01.12 ~ 2022.01.14, 18 people in their 20s)__: People said offline dance lessons are hard to attend and it’s hard to know if they’re dancing correctly.

---

#### 📄Project Proposal

- [Shake Up Proposal](https://www.notion.so/D103-PJT-c78a7f3e6bcd47da97c96dcc1298bc27)

---

#### 🖼Wireframes

![xd1](https://user-images.githubusercontent.com/56299114/170521682-e3d12481-9719-4ed4-8a10-f9312ca0399e.png)
![xd2](https://user-images.githubusercontent.com/56299114/170521685-9106a1c6-9c77-4ad0-9443-b8ffb721de02.png)
![xd3](https://user-images.githubusercontent.com/56299114/170521687-a5798d5a-8e1b-417b-92f6-34f93edddf2f.png)
![xd4](https://user-images.githubusercontent.com/56299114/170521691-02921e6b-d9bd-4891-9c1e-853e8af788d3.png)

---

#### 📋Feature Spec & Test Cases

- [Feature Spec & Test Cases](https://docs.google.com/spreadsheets/d/1aXiM5Yno-RHuojN0EQbiN67ZDSFzH-xj7Qvfr8-OG5Y/edit#gid=0)

---

## 💡Key Features

### 🤸‍♀️Dance Along

- Designed for users who want to learn or follow dance moves.

- After following the dance shown through the smartphone camera, AI evaluates the number of correctly performed moves.

- Follow the dance, check your results, and view feedback!

![dance](https://user-images.githubusercontent.com/56299114/170524831-ca254ed5-6a37-4533-9e19-6288ffab9106.gif)
![detect](https://user-images.githubusercontent.com/56299114/170524857-fbbf40f0-a2fe-4ba6-9f58-6bd1ee9e29c9.gif)
![result](https://user-images.githubusercontent.com/56299114/170524873-efefece3-2cd9-4c5e-81e5-20e7c43a4187.gif)

- Upload your video to your personal channel!

![upload](https://user-images.githubusercontent.com/56299114/170524878-f77e71bf-7dc0-47b1-9dcb-8f82d573901c.gif)
![mypage-upload](https://user-images.githubusercontent.com/56299114/170524879-3f99dba6-b69a-4f77-9922-826ca7e4442c.gif)

---

### 🏆Dance World Cup

- Open dance battle anyone can join by uploading videos!

- Choose between two videos; the one with more votes wins!

- Join and vote in ongoing competitions  
- Check rankings during the event

![participate](https://user-images.githubusercontent.com/56299114/170524888-dfa232b4-7665-4bb2-ba48-5ae8beee6c5d.gif)
![ranking](https://user-images.githubusercontent.com/56299114/170524897-043d6d23-36b5-4263-980d-c89a8a8b275c.gif)

- Vote and check results!

![vote](https://user-images.githubusercontent.com/56299114/170524912-e4abc013-6ec9-49af-862f-8e36d39e3194.gif)

---

### ▶️Channel System

- View your videos, Dance Along results, and World Cup scores.

- Follow favorite dancer channels.

![mypage-dance](https://user-images.githubusercontent.com/56299114/170524936-54ec6a05-603c-47f8-a975-acb10f3f7e2f.gif)
![mypage-worldcup](https://user-images.githubusercontent.com/56299114/170524942-01698fb4-38f5-447a-90c0-8a4732732330.gif)

- View your uploads and videos from subscribed users.

![mypage-upload](https://user-images.githubusercontent.com/56299114/170524879-3f99dba6-b69a-4f77-9922-826ca7e4442c.gif)
![mypage-sub](https://user-images.githubusercontent.com/56299114/170524963-82dde5d5-fa9e-4ff4-b428-881124ed2b36.gif)

---

#### 👀Demo Scenario

- [Demo Scenario](https://github.com/apdltpdl22/Shake-Up/blob/master/exec/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4.md)

---

## 🌈Development Environment

| Backend | Version |
|--------|---------|
| IntelliJ IDEA | - |
| Java | 11.0.12 |
| MySQL | 8.0 |
| Spring Boot | 2.4.0 |
| Spring Boot JPA | 2.5.4 |
| Spring Security | - |
| Lombok | - |
| Swagger | 2.9.2 |
| JWT | 0.9.1 |

| Frontend | Version |
|----------|---------|
| Visual Studio Code | - |
| React | 17.0.2 |
| React Router | - |
| Redux | 4.1.2 |
| MUI | - |

| CI/CD |
|-------|
| AWS |
| Nginx |
| Jenkins |

---

## 🌈Service Architecture

![Architecture](README.assets/154609961-fbdad059-1f99-4954-ac19-3152faf3d2d3.png)

---

## 🌈CI/CD

**Shake Up** is built with an automated deployment pipeline using **Jenkins**.

By setting up a GitLab Webhook and GitLab trigger in Jenkins, both the frontend and backend are automatically built and deployed whenever a push is made to the **Master branch**.

Frontend (React.js) is deployed using **Nginx**, while the backend is built into a `.jar` file and run in the background using the `nohup` command.

- [View Deployment Guide](https://lab.ssafy.com/s06-webmobile2-sub2/S06P12D103/-/blob/develop/exec/AWS%EB%B0%B0%ED%8F%AC%EB%B0%A9%EB%B2%95.md)

---

## 🌈Technical Highlights

### Tensorflow.js

- Recognizes dance poses through pose detection

  - [What is PoseNet?](https://www.notion.so/PoseNet-c87bc00c193e4d31adff76945af9a36f)

- **Teachable Machine**

  - Learns distinct poses from a song's choreography and checks whether the user performs those poses accurately during the dance.

  ![pose](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c1d4f6ea-703b-4589-b7cc-ee4e6ab6651a/p3.png)

  - Trained poses are mapped to song timestamps and compared with the user's uploaded video.

---

### Deployment

- Automated deployment built using **Jenkins**, **Docker**, and **Nginx**.

---

## 🌈Collaboration Tools

![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)  
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)  
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)  
![Discord](https://img.shields.io/badge/Discord-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)  
![Mattermost](https://img.shields.io/badge/Mattermost-blue)  
![Webex](https://img.shields.io/badge/Webex-darkblue)  
![Gather Town](https://img.shields.io/badge/Gather%20Town-skyblue)

---

### 💠Git

#### ☠️Git Convention

- **Branch Naming Rule**

  `master` → `develop` → `feature/FE/feature-name`, `feature/BE/feature-name`  
  Ex) `feature/FE/login`, `feature/BE/logout`

- **Commit Messages**

  - When merging to `develop`:

    ```bash
    git commit -m “merge branch-name [#JiraIssueNumber]”
    ```

    Example: `merge feature/FE/reactTensorflow #290`

  - When pushing from a working branch:

    ```bash
    git commit -m “update branch-name [#JiraIssueNumber]”
    ```

    Example: `update feature/FE/reactTensorflow #290`

#### ☠️Git Flow Branch Strategy

![git flow](https://user-images.githubusercontent.com/43775108/125800526-2ea36d8e-6262-4ba5-9ef0-af7845131d85.png)

---

### 💁‍♀️Jira

- **Agile Methodology**
- **Sprint Planning**: Weekly Monday meetings to plan tasks and issues
- **Daily Scrum**: 5–10 minutes updates on previous and current work

  1️⃣ Epic — Major features  
  2️⃣ Story — Detailed sub-tasks of Epics  
  3️⃣ Label — To distinguish Frontend / Backend work

---

### 📒Notion

- Used for writing daily meeting notes and organizing the project

![notion](https://user-images.githubusercontent.com/56299114/170526868-de254e68-bd68-4a32-9cec-6287280c2a2a.png)

---

### 👂Discord

- Used as an online workspace after working hours

![discord](https://user-images.githubusercontent.com/56299114/170526872-0b8735ae-c03b-4401-8d70-dd7714b0fd51.png)

---

### 🌀Mattermost

- Integrated with Git and Jira for issue alerts

---

### 🌐Webex

- Main collaboration tool used from 9 to 6

---

### 🏠Gather Town

- Used for whiteboard sessions and real-time collaboration

![gather](https://user-images.githubusercontent.com/56299114/170526874-c6756df2-726d-467b-acfb-a7e675a04869.png)

---

## 🌈ERD

- [ShakeUp_DB_Dump.sql](/uploads/c4b9eb925c747daf279c7b3efe317cfd/ShakeUp_DB_Dump.sql)

![ERD](https://user-images.githubusercontent.com/56299114/170526876-e7f5f04e-263a-40a1-9973-7bf6e0a0d87d.png)

---

## 🌈EC2 Port Map

| Server | Port |
|--------|------|
| REST API (Spring Boot) | 8181 |
| Jenkins | 8000 |
| MySQL | 3306 |
| HTTP Default | 80 |

---

## 👬Team Members

__Kim Dae-eun__ 👑Team Leader  
- 😍 Github: [@developerDaeun](https://github.com/developerDaeun)  
- Backend / React / TensorFlow  
- Responsibilities: Team management, API development, AI model integration, Firebase, UX integration

__Lee Myung-sung__  
- 😍 Github: [@apdltpdl22](https://github.com/apdltpdl22)  
- Frontend / Adobe XD  
- Responsibilities: Planning, UI/UX design, main pages, CSS, presentation materials

__Lee Seung-kwan__  
- 😍 Github: [@qnfzks111](https://github.com/qnfzks111)  
- Backend / Security / API  
- Responsibilities: DB design, JWT auth, dance recognition API

__Lim Gi-tae__  
- 😍 Github: [@Lazy-GT](https://github.com/Lazy-GT)  
- Backend / AWS / Deployment  
- Responsibilities: API, DB, AWS integration, Jenkins CI/CD

__Jo Joon-young__  
- 😍 Github: [@21stairs](https://github.com/21stairs)  
- Frontend / Firebase  
- Responsibilities: Signup, MyPage, NavBar, Firebase storage, UserContext

__Choi Sung-seok__  
- 😍 Github: [@gaegosang](https://github.com/gaegosang)  
- Frontend / Android  
- Responsibilities: Login, Android Camera2 API, React WebView, UCC editing

---

## 📌Site

- [Download Shake Up App](http://i6d103.p.ssafy.io/download)  
- [Shake Up Website](http://i6d103.p.ssafy.io/)

---

## 📌Contact

eksfkawnl1@gmail.com
