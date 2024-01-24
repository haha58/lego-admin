module.exports = {
    types: [
        {
            value: 'WIP',
            name: '💡  WIP: Work in progress',
        },
        {
            value: 'update',
            name: '♻️  update:add some content',
        },
        {
            value: 'feat',
            name: '🚀  feat: A new feature',
        },
        {
            value: 'fix',
            name: '🔧  fix: A bug fix',
        },
        {
            value: 'refactor',
            name: '🔨  refactor: A code change that neither fixes a bug nor adds a feature',
        },
        {
            value: 'release',
            name: '🛳  release: Bump to a new Semantic version',
        },
        {
            value: 'docs',
            name: '📚  docs: Documentation only changes',
        },
        {
            value: 'test',
            name: '🔍  test: Add missing tests or correcting existing tests',
        },
        {
            value: 'perf',
            name: '⚡️  perf: Changes that improve performance',
        },
        {
            value: 'chore',
            name:
                "🚬  chore: Changes that don't modify src or test files. Such as updating build tasks, package manager",
        },
        {
            value: 'workflow',
            name:
                '📦  workflow: Changes that only affect the workflow. Such as updating build systems or CI etc.',
        },
        {
            value: 'style',
            name:
                '💅  style: Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
        },
        {
            value: 'revert',
            name: '⏱  revert: Revert to a commit',
        },
    ],
    messages: {
        type: '选择一种你的提交类型:',
        customScope: '请输入修改范围(可选):',
        subject: '短说明:',
        body: '长说明，使用"|"换行(可选)：',
        footer: '关联关闭的issue，例如：#31, #34(可选):',
        confirmCommit: '确定提交说明?'
    },
    // Specify the scopes for your particular project
    scopes: [],
    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
}
