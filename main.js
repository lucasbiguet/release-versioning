const core = require("@actions/core");
const github = require("@actions/github");
const http = require("@actions/http-client")

const token = core.getInput("repo-token");

const octokit = github.getOctokit(token);


const run = async () => {
    console.log(github.context)

    try{
        let regExp = RegExp(/[Vv](\d)+/)

        var tagsRequest = await octokit.rest.repos.listTags({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo
        })

        orderedTags = tagsRequest.data.filter(t => regExp.test(t.name)).map(t=>t.name).sort((x,y) => x.localeCompare(y)).reverse()

        nextVersionTag = `v${parseInt(orderedTags[0].substring(1))+1}`

        console.log(`last version is ${orderedTags[0]}`)
        console.log(`next version is ${nextVersionTag}`)

        core.setOutput("last", orderedTags[0] || "")
        core.setOutput("next", nextVersionTag)
    }catch(e){
        console.log("FAIL", e)
    }
}

run()