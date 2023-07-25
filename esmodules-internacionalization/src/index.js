import database from './../database.json' assert { type: "json" }
import Person from './persons.js'
import { save } from './repository.js'
import TerminalController from './terminalController.js'

const DEFAULT_LANG = 'pt-br'
const STOP_TERM = ":q"

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
    try {
        const answer = await terminalController.question()
        if (answer === STOP_TERM) {
            terminalController.closeTerminal()
            console.log('process finished!')
            return;
        }

        const person = Person.generateInstanceFromString(answer)
        await save(person)
        terminalController.updateTable(person.formatted(DEFAULT_LANG))

        return mainLoop()
    } catch (error) {
        console.error('DEU RUIM **', error);
        return mainLoop()
    }
}

await mainLoop()