import 'highlight.js/styles/vs2015.css'

// https://codepen.io/KrissSteindals/pen/yrBdQe?editors=0110
import * as Showdown from 'showdown'
import highlightjs from 'highlight.js'

Showdown.extension('codehighlight', function () {
  function htmlunencode(text: string) {
    return text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  }
  return [
    {
      type: 'output',
      filter(text, converter, options) {
        // use new shodown's regexp engine to conditionally parse codeblocks
        const left = '<pre><code\\b[^>]*>'
        const right = '</code></pre>'
        const flags = 'g'
        const replacement = function (wholeMatch: string, match: string, left: string, right: string) {
          // unescape match to prevent double escaping
          match = htmlunencode(match)
          return left + highlightjs.highlightAuto(match).value + right
        }
        return Showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags)
      },
    },
  ]
})
const ShowdownConverter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  extensions: ['codehighlight'],
})
export default ShowdownConverter
