import fs from 'fs';
import { Tree } from './interfaces/Tree.interface';
import { Repository } from './interfaces/Repository.interface';
import * as readline from 'readline'


/*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("What are you doing?", (answer) => 
{
    console.log("Ohh," + answer)
    rl.close();
})*/
const localDir = './localRepositories/';
let repositories: Repository[] = [];
fs.readdirSync(localDir).forEach((folder) => {
	let repository: string = localDir + folder + '/package.json';

	if (fs.existsSync(repository)) {
		const file: String = fs.readFileSync(repository).toString();

		if (file && file !== '') {
			const packageJSON: Repository = JSON.parse(file.toString());      
            repositories.push(packageJSON);
		}
	}
});

let tree: Tree[] = [];
repositories.forEach( r => tree.push(createTree(repositories,r.name)));


function createTree(repos:Repository[],name:string): Tree
{

    let filtered = repos.filter( x => x.name === name);
    let children: Tree[] = [];
    if(filtered.length >= 1)
    {
        let repo = filtered[0];
        

        if( repo.dependencies)
        {
            for(let dependencyName in repo.dependencies)
            {
                children.push(createTree(repos, dependencyName));
            }
        }
    }

    let newTree:Tree = 
    {
        name: name,
        dependecies: children
    }

    return newTree;
    
}

tree.forEach( (node) => 
{
    printNode(node,'-');
    console.log("")
    
})

function printNode(node: Tree,prefix:string)
{
    console.log(prefix +" "+ node.name);

    if(node.dependecies)
    {
        node.dependecies.forEach( n => printNode(n,prefix+'-'));
    }
}

