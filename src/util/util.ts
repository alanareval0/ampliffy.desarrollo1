import { Repository } from '../interfaces/repository.interface';
import fs from 'fs';
import { Tree } from '../interfaces/tree';
import { Params } from '../interfaces/params.interface';
import * as readline from 'readline';
import { localDir } from './constants';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});


function getRepositories(dir: string): Repository[] {
	let repositories: Repository[] = [];
	fs.readdirSync(dir).forEach((folder) => {
		let repository: string = dir + folder + '/package.json';

		if (fs.existsSync(repository)) {
			const file: String = fs.readFileSync(repository).toString();

			if (file && file !== '') {
				const packageJSON: Repository = JSON.parse(file.toString());
				repositories.push(packageJSON);
			}
		}
	});

	return repositories;
}
export function createTree(dir: string): Tree[] {
	let repositories: Repository[] = getRepositories(dir);
	let tree: Tree[] = [];
	repositories.forEach((r) =>
		tree.push(createDependencyTree(repositories, r.name))
	);

	return tree;
}

function createDependencyTree(repos: Repository[], name: string): Tree {
	let filtered = repos.filter((x) => x.name === name);
	let children: Tree[] = [];
	if (filtered.length >= 1) {
		let repo = filtered[0];

		if (repo.dependencies) {
			for (let dependencyName in repo.dependencies) {
				children.push(createDependencyTree(repos, dependencyName));
			}
		}
	}

	let newTree: Tree = new Tree(name, children);

	return newTree;
}

export const readParams = async (argv:string[]): Promise<Params> => {
	let project: string = '',
		commitID: string = '',
		branchName: string = '',
		dir: string = '';

	argv.forEach((val:string, index:number) => {
		let param = val.split('=');

		if (param.length === 2) {
			let key = param[0].toLowerCase();
			let value = param[1];

			switch (key) {
				case 'p':
				case 'project':
					project = value;
					break;
				case 'c':
				case 'commit':
					commitID = value;
					break;
				case 'b':
				case 'branch':
					branchName = value;
					break;
				case 'd':
				case 'dir':
					dir = value;
					break;
				default:
					break;
			}
		}
	});
	if (!project)
	{
		let resp = String(await question('Cual es nombre de tu proyecto?'));

		project = resp;
	}
	if (!dir) {
		let isValidAnswer = false;

		while (!isValidAnswer) {
			let answer = String(
				await question('Quiere usar el directorio por defecto? (y/n)?')
			).toLowerCase();

			if (answer === 'n' || answer === 'no') {
				let dir = String(await question('Cual tu directorio?'));
				dir = dir;
				isValidAnswer = true;
			} else if (answer === 'y' || answer === 'yes') {
				dir = localDir;
				isValidAnswer = true;
			} else {
				console.log(`Respuesta no valida:`);
			}
		}

	}
	let params:Params = {project,commitID,dir,branchName}
	return params;
};

export const question = (questionText: string) => {
	return new Promise((resolve, reject) => {
		rl.question(questionText, resolve);
	});
};