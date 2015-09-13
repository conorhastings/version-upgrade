# Node Version Upgrade

Your node version is stored all over the place, `.nvmrc` `.node_version`, `circle.yml` etc... Instead of going through every file, just pass a list of files here (or default to the current directory) and the node version will be upgraded for you. package.json is updated automatically and there is no need to pass it as an argument.
### Install
`npm install -g version-upgrade`

### Use

```
version-upgrade --file=.nvmrc,.node-version --version=4.0.0
```