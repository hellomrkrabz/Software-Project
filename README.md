Required to install: npm, nodejs, yarn

https://nodejs.org/en

https://www.npmjs.com/

https://yarnpkg.com/getting-started/install

Before launching, install the above, then enter the project directory and type the command `yarn install`. It should take care of setting up the project

After new commits you have to create virtual environment and check for new dependencies:
1.    Open powershell and get to the Software-Project folder
2.    Type the command `Set-ExecutionPolicy Unrestricted -Scope Process`
3.    Create virtual environment `python -m venv .venv`
4.    Enable virtual environment `.\.venv\Scripts\Activate.ps1`
5.    Download dependencies `pip install -r backend\requirements.txt`

###BACKEND

1.    Open powershell and get to the Software-Project folder
2.    Type the command `Set-ExecutionPolicy Unrestricted -Scope Process`
3.    Run with `yarn start-back`

###FRONTEND
1.    Open powershell and get to the Software-Project folder
2.    Run the site with `yarn start`
