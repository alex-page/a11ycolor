workflow "Build, test and publish on master" {
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
  needs = ["Install dependencies"]
}

action "Master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
  needs = ["Test"]
}

action "Publish" {
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
  needs = ["Master branch only"]
}
