<template>
    <div>
        <div>
            <input v-model="branch">
            <button @click="addBranch">Add Branch</button>
            <button @click="addCommit">Add Commit</button>
        </div>

        <canvas id="gitGraph"></canvas>

        <ul>
            <li v-for="branch in gitGraphData.branches" :key="branch.id">
                {{branch.name}}
                <ul v-if="hasCommits(branch.id)">
                    <li v-for="commit in commits(branch.id)" :key="commit.id">
                        {{commit.message}}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import uuidv4 from 'uuid/v4';
import {GitGraphData, Branch, Commit} from '../models/GitGraphData';

@Component({
})
export default class GitGraphDisplay extends Vue {
    protected branch = 'master';
    protected gitGraphData: GitGraphData = {
        branches: [],
    };

    private gitgraph: any;

    public addBranch() {
        const branch = {
            id: uuidv4(),
            name: this.branch,
            commits: [],
            ggBranch: this.gitgraph.branch(this.branch),
        };
        this.gitGraphData.branches.push(branch);
    }

    public addCommit() {
        const commit = {
            id: uuidv4(),
            message: 'blah blah',
        };
        const branch = this.gitGraphData.branches.find((x) => x.name === this.branch);
        if (!!branch) {
            branch.commits.push(commit);
            branch.ggBranch.commit(commit.message);
        }
    }

    public hasCommits(branchId: string): boolean {
        return this.getCommits(branchId).length > 0;
    }

    public commits(branchId: string): Commit[] {
        return this.getCommits(branchId);
    }

    private mounted() {
        this.gitgraph = new GitGraph({
            template: 'metro',
            orientation: 'horizontal',
            mode: 'compact',
        });
    }

    private getCommits(branchId: string): Commit[] {
        const branch = this.gitGraphData.branches.find((x) => x.id === branchId);
        if (!branch) {
            return [];
        }
        return branch.commits;
    }
}
</script>
