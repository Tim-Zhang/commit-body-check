module.exports = {
  getOutput(commitInfos) {
    const lines = commitInfos.map(info => `  ${info.sha}    ${info.message}`)

    return `

    ${lines.join('\n')}`
  },
}
