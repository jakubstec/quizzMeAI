<h3 align="center">QuizzMeAI</h3>

<div align="center">
</div>

---

<p align="center"> A study tool designed to make learning more engaging, efficient, and effective, this project transforms any set of notes into personalized, interactive, AI-generated quizzes!
    <br> 
</p>

## 📝 Table of Contents
- [Getting Started](#getting_started)
- [Installing](#installing)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Authors](#authors)

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Google API Key 
```
https://aistudio.google.com/app/apikey
```

```
Python, Node.js, npm 
```

## Installing <a name = "installing"></a>
- Clone project
```
git clone https://github.com/jakubstec/quizzMeAI.git
```

- Change the .env_sample file to .env and paste your Google API Key
```
API_KEY=YOUR_API_KEY_HERE
```

inside /backend folder
Install necessary packages
```
cd .\quizzMeAI\backend\
pip install -r requirements.txt
```

- In app.py, change app.run() to
```
app.run(debug=True)
```
so it refreshes every time you make changes in your code.

- now leave terminal with running server and enter /frontend directory

- there you need to install Vite
```
npm install vite
```
- then run the project

```
npm run dev
```

Everything should be working correctly!

## Usage <a name = "usage"></a>
- You can use
  ```
  https://quizz-me-ai.vercel.app/
  ```
  as your server, but if you want to make changes, change the line above (Home.jsx) to
  ```
  http://localhost:5000/
  ```
- To run server-side
  ```
  python .\app.py
  ```
- To run frontend-side
  ```
  npm run dev
  ```

## ⛏️ Built Using <a name = "built_using"></a>
- [Flask](https://flask.palletsprojects.com/en/stable/) - Backend Framework
- [React.js](https://react.dev/) - Frontend Framework

## ✍️ Authors <a name = "authors"></a>
- [@jakubstec](https://github.com/jakubstec)
