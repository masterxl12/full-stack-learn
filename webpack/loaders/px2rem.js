const css = require('css')
const pxRegExp = /\b(\d+(\.\d+)?)px\b/g

class Px2rem {
    constructor(config) {
        this.config = config
    }
    generateRem(cssText) {
        let self = this;
        let astObj = css.parse(cssText)

        function processRules(rules) {
            rules.forEach((ruleItem) => {
                let declarations = ruleItem.declarations
                declarations.forEach((item => {
                    if (item.type === 'declaration' && pxRegExp.test(item.value)) {
                        item.value = self._getCalcValue('rem', item.value)
                    }
                }))
            })
        }
        processRules(astObj.stylesheet.rules)
        return css.stringify(astObj)
        // console.log(JSON.stringify(astObj.stylesheet.rules, null, 2));
    }
    _getCalcValue(type, value) {
        let { remUnit, remPrecision } = this.config
        return value.replace(pxRegExp, (_, $1) => {
            let val = (parseFloat($1) / remUnit).toFixed(remPrecision) + type
            return val
        })
    }
}

module.exports = Px2rem

/*
{
  "type": "stylesheet",
  "stylesheet": {
    "rules": [
      {
        "type": "rule",
        "selectors": [
          "#root"
        ],
        "declarations": [
          {
            "type": "declaration",
            "property": "width",
            "value": "750px",
          },
          {
            "type": "declaration",
            "property": "height",
            "value": "750px",
          },
          {
            "type": "declaration",
            "property": "background-color",
            "value": "antiquewhite",
          }
        ],
      }
    ]
  }
}
*/