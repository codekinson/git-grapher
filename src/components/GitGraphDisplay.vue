<template>
    <div>
        <canvas id="gitGraph"></canvas>

        <input v-model="branch">
        <button @click="addBranch">Add Branch</button>
        <button @click="addCommit">Add Commit</button>

        <ul>
            <li v-for="branch in gitGraphData.branches">
                {{branch.name}}
                <ul v-if="hasCommits(branch.name)">
                    <li v-for="commit in commits(branch.name)">
                        {{commit}}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import GitGraphData from '../models/GitGraphData';
import Branch from '../models/Branch';

@Component({
})
export default class GitGraphDisplay extends Vue {
    protected branch = 'master';
    protected gitGraphData: GitGraphData = {
        branches: [],
    };

    public addBranch() {
        const branch = {
            name: this.branch,
            commits: [],
        };
        this.gitGraphData.branches.push(branch);
    }

    public addCommit() {
        this.gitGraphData.branches.filter((branch) => branch.name === this.branch)[0].commits.push('blah blah');
    }

    public hasCommits(branchName: string): boolean {
        return this.getCommits(branchName).length > 0;
    }

    public commits(branchName: string): string[] {
        return this.getCommits(branchName);
    }

    private mounted() {
        /*const gitgraph = new GitGraph({
            template: 'metro',
            orientation: 'horizontal',
            mode: 'compact',
        });
        this.gitGraphData.branches.forEach((branch: Branch) => {
            const ggBranch = gitgraph.branch(branch.name);
            branch.commits.forEach((commitMessage: string) => {
                ggBranch.commit(commitMessage);
            });
        });*/
    }

    private getCommits(branchName: string): string[] {
        const branch = this.gitGraphData.branches.find((x) => x.name === branchName);
        if (!branch) {
            return [];
        }
        return branch.commits;
    }
}
</script>
