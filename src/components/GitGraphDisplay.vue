<template>
    <div>
        <div class="row">
            <div class="col">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="input-branch-label">Branch</span>
                    </div>
                    <input v-model="branch" type="text" class="form-control" aria-label="Name of branch to create" aria-describedby="input-branch-label">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="input-branch-label">From</span>
                    </div>
                    <select class="form-control" v-model="fromBranch">
                        <option value="">HEAD</option>
                        <option v-for="branch in gitGraphData.branches" :key="branch.id" :value="branch.id">
                            {{branch.name}}
                        </option>
                    </select>
                    <div class="input-group-append">
                        <button @click="addBranch" class="btn btn-outline-secondary" type="button">Create</button>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="input-branch-label">Add Commit to</span>
                    </div>
                    <select class="form-control" v-model="commitBranch">
                        <option value=''>Select a branch</option>
                        <option v-for="branch in gitGraphData.branches" :key="branch.id" :value="branch.id">
                            {{branch.name}}
                        </option>
                    </select>
                    <div class="input-group-append">
                        <button @click="addCommit" class="btn btn-outline-secondary" type="button">Create</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <canvas id="gitGraph"></canvas>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import uuidv4 from 'uuid/v4';
import {GitGraphData, Branch, Commit} from '../models/GitGraphData';

@Component({
})
export default class GitGraphDisplay extends Vue {
    protected branch = '';
    protected fromBranch = '';
    protected commitBranch = '';
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

    private getBranch(branchId: string): Branch | undefined {
       return this.gitGraphData.branches.find((x) => x.id === branchId);
    }

    private getCommits(branchId: string): Commit[] {
        const branch = this.getBranch(branchId);
        if (!branch) {
            return [];
        }
        return branch.commits;
    }
}
</script>
