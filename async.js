const getUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a user from the database...");
            resolve({ id: id, githubUsername: "John" })
        }, 2000)
    })
}

const getRepositories = (githubUsername) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a repository...");
            resolve({ [githubUsername]: ["repo1", "repo2", "repo3"] })
        }, 2000)
    })
}

const getCommits = (repo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Getting commits...");
            // resolve(["commits"])
            reject(new Error("Couldn't get commits"));
        }, 2000)
    })
}
console.log("async ")

// getUser(1)
//     .then((user) => getRepositories(user.githubUsername))
//     .then((repo) => getCommits(repo))
//     .then(commits => console.log('commits', commits))


const displayCommits = async () => {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.githubUsername);
        const commits = await getCommits(repos);
        console.log('commits', commits)
    }
    catch (err) {
        console.log('error', err.message);
    }
}

displayCommits();
console.log("After")

// const p1 = new Promise(resolve => {
//     setTimeout(() => {
//         console.log("Operation 1........");
//         resolve(1);
//     }, 2000)
// })

// const p2 = new Promise(resolve => {
//     setTimeout(() => {
//         console.log("Operation 2........");
//         resolve(2);
//     }, 2000)
// })

// Promise.all([p1, p2])
//     .then(result => console.log(result))