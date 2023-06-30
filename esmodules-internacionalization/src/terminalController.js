import chalk from 'chalk'
import DraftLog from 'draftlog'
import readline from 'readline'
import chalkTable from 'chalk-table'

import Person from './persons.js'


export default class TerminalController {
    constructor() {
        this.print = {}
        this.data = {}
    }

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin)
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language)
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(), data)
        
        this.print = console.draft(table)
        this.data = data
    }

    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    closeTerminal() {
        this.terminal.close()
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.magenta("ID") },
                { field: "vehicles", name: chalk.cyan("Vehicles") },
                { field: "kmTraveled", name: chalk.cyan("KM Traveled") },
                { field: "from", name: chalk.blue("From") },
                { field: "to", name: chalk.blue("To") },
            ]
        }
    }
}