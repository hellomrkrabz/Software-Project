Required to install: npm, nodejs, yarn

###BACKEND

1.    Open powershell and get to the Software-Project folder
2.    Type the command `Set-ExecutionPolicy Unrestricted -Scope Process`
3.    Run with `yarn start-back`

After new commits you have to create virtual environment and check for new dependencies:
1.    Open powershell and get to the Software-Project folder
2.    Type the command `Set-ExecutionPolicy Unrestricted -Scope Process`
3.    Create virtual environment `python -m venv .venv`
4.    Enable virtual environment `.\.venv\Scripts\Activate.ps1`
5.    Download dependencies `pip install -r backend\requirements.txt`


###FRONTEND
1.    Open powershell and get to the Software-Project folder
2.    Run the site with `yarn start`
