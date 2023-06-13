import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline'

import database from './../database.json' assert { type: "json" }


DraftLog(console).addLineListener(process.stdin)

const options = {
    leftPad: 2,
    columns: [
        { field: "id", name: chalk.magenta("ID") },
        { field: "vehicles", name: chalk.cyan("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("KM Traveled") },
        { field: "from", name: chalk.blue("From") },
        { field: "to", name: chalk.blue("To") },
    ]
}

const table = chalkTable(options, database)
const print = console.draft(table)

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

terminal.question('Qual é o seu nome?', msg => {
    console.log('msg', msg.toString());
})
