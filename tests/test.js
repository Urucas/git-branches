import gitBranches from "../lib/branches.js"
import chai from 'chai'

let should = chai.should()

describe("Test brances.js", () => {
  
  it("Test branches result", (done) => {
    gitBranches(process.cwd()).then( (branches) => {
      branches.should.be.a("array")
      branches.indexOf("master").should.not.equal(-1)
      done()
    })
  })

})
