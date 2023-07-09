import ejs from 'ejs'
import fs from 'fs'
import languageColors from 'resources/language-colors.json'

const template = fs.readFileSync('.github/ISSUE_TEMPLATE/submit-snippet.yaml.ejs', 'utf-8')

const languages = Object.keys(languageColors).filter((language) => !language.startsWith('__'))

const submitSnippetIssueTemplate = ejs.render(template, {
  languages,
})

fs.writeFileSync('.github/ISSUE_TEMPLATE/submit-snippet.yaml', submitSnippetIssueTemplate)
