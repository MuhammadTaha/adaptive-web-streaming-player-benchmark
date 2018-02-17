# Adaptive Web Streaming Player Benchmark Tool

Dash player is an open source adaptive web streaming player. This project makes a benchmarking tool for the player.

## How to run project

* Change the credential of database in `ams-backend/db.js` file
* Run database schemas provided in `db_schema` folder.

* To build dash-benchmark run

        `npm run build`

* In chrome browser, click `Load unpacked extension` and then use the `dash-backend/out` folder for the extension to collect memory load of the tab.

### Running using bash file

* To run the project, either execute the `run-me.sh` file in using `bash run-me.sh` from the terminal.

### Running using commands

* Execute the following commands in `dash-benchmark` and `ams-backend` folders.

        `npm install` 

and then

           `npm run start`



