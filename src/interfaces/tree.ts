export class Tree {
	private name: string;
	private dependecies: Tree[];

	constructor(name: string, dependencies: Tree[]) {
		this.name = name;
		this.dependecies = dependencies;
	}

	getName(): string {
		return this.name;
	}
	getDependencies(): Tree[] {
		return this.dependecies;
	}

	dependsOn(dependencyName: string): boolean
	{
		if (this.name === dependencyName) return true;
		if (!this.dependecies.length) return false;
	
		for (let node of this.dependecies) {
			if (node.dependsOn(dependencyName))
			{
				return true;
			}
		}
		

		return false;
	}

	printDependencies(prefix: string = '')
	{
		console.log(prefix + this.name)
		if (this.dependecies)
		{
			this.dependecies.forEach((n) => n.printDependencies(prefix + '-'));
		}
	}
}
