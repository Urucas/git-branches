# git-branches
Get a current repositories branches list

#Install
```bash
npm install --save git-branches
```

#Usage
```javascript
import gitBranches from 'git-branches'
gitBranches('./'),then( (branches) => {
  console.log(branches)
  // [ 'master', 'gh-pages' ]
})
```
