workflow "Publish to NPM" {
  on = "push"
  resolves = ["Publish"]
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  uses = "actions/npm@master"
  args = "run test"
  needs = "Install dependencies"
}

action "Master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Publish" {
  uses = "actions/npm@master"
  args = "publish --access public --dry-run"
  secrets = ["NPM_AUTH_TOKEN"]
  needs = "Master branch only"
}
