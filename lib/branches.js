import fs from 'fs'
import path from 'path'

export function parser(fetch_head) {
  let branches = []
  fetch_head.split("\n").map( (head) => {
    if(head == "") return head
    let branch = /branch\s+\'[\w\d\-]+\'\s+/.exec(head)
    if(!branch) return head
    let branch_name = /\'[\w\d\-]+\'/.exec(branch[0].trim())
    if(branch_name) branches.push(branch_name[0].replace(/\'/ig, "").trim())
    return head
  })
  return branches
}

export default function branches(root) {
  let git_root = path.join(root, '.git')
  return new Promise( (res, rej) => {
    fs.stat(git_root, (err, stats) => {
      if(err) return rej(err)
      if(!stats.isDirectory()) 
        return rej(new Error('no gitconfig to be found at '+git_root))

      let fetch = path.join(git_root, 'FETCH_HEAD')
      fs.readFile(fetch, (err, data) => {
        if(err) { 
          if(err.code == "ENOENT") res(["master"])
          else rej(err)
          return
        }
        let branches = parser(data+"")
        res(branches)
      })
    })
  })
 }
