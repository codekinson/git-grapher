export interface GitGraphData {
    branches: Branch[];
}

export interface Branch {
    id: string;
    commits: Commit[];
    name: string;
    ggBranch: any;
}

export interface Commit {
    id: string;
}
