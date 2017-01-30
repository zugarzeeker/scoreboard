const assert = require('assert')
const { step, action } = require('prescript')
const { graphql } = require('./lib/common')

step('Register players', () => {
  step('Register flicknote', () => graphql(`mutation { registerPlayer(name: "flicknote") { id } }`))
  step('Link account flicknote', () => graphql(`mutation { linkPlayer(jwt: "valid.flicknote.a") { id, linked } }`))

  step('Register dtinth', () => graphql(`mutation { registerPlayer(name: "dtinth") { id } }`))
  step('Link account dtinth', () => graphql(`mutation { linkPlayer(jwt: "valid.dtinth.b") { id, linked } }`))
})

step('Save scores', () => {
  step('Save flicknote score', () => graphql(`mutation {
    registerScore(
      jwt: "valid.flicknote.a",
      md5: "01234567012345670123456701234567",
      playMode: "BM",
      input: {
        score: 400000,
        combo: 50,
        count: 30,
        log: "ABCX"
      }
    ) {
      resultingRow { rank, entry { id, player { name } } }
      level { leaderboard { rank, entry { id, player { name } } } }
    }
  }`))
})

require('prescript').pending()
