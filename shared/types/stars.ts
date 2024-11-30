export type GithubData = {
  lastCommitAt: string
  stars: number
}

export type DataStats = {
  projectsCount: number
  github: GithubData
  usersCount: number
}
