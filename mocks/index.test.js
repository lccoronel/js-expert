const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
;
(async () => {
    {
        const filePath = './mocks/emptyFile-validation.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
    
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
    
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJSON(filePath)
        const expected = [
            {
              "name": "Erick Wendel",
              "id": 123,
              "profession": "Instructor",
              "age": 26
            },
            {
              "name": "Lucas Coronel",
              "id": 321,
              "profession": "Student",
              "age": 26
            },
            {
              "name": "Geisa Santna",
              "id": 322,
              "profession": "Student",
              "age": 26
            }
        ]
        
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()