const core = require('@actions/core')

const helper = require('./libs/helper.js')


const ErrorCommitBodyEmpty = 'Commit body is missing'

async function main() {
  try {
    const commitsString = core.getInput('commits')
    const commits = JSON.parse(commitsString)

    const failed = []

    for (const {commit, sha} of commits) {
      const lines = commit.message.split('\n')
      const validLines = lines.filter(line => line.trim() && !isDco(line))

      if (validLines.length <= 1) {
        failed.push({sha, message: ErrorCommitBodyEmpty})
      }
    }

    if (failed.length > 0) {
      const summary = helper.getOutput(failed)
      core.setFailed(summary)
    }

  } catch (error) {
    core.setFailed(error.message)
  }
}

function isDco(text) {
  const re = /^Signed-off-by: ([^<]+) <([^<>@]+@[^<>]+)>$/gim
  return re.test(text)
}

main()
