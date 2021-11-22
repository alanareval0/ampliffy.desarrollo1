import { Tree } from './interfaces/tree';
import { argv } from 'process';
import { Params } from './interfaces/params.interface';
import { createTree, question, readParams } from './util/util';

const init = async () => {
	let params: Params = await readParams(argv);

	let tree: Tree[] = createTree(params.dir!);

	if (!tree.length) {
		console.log(`No hay repositorios validos en: ${params.dir}`);
	} else {
		let currentProject = tree.filter((t) => t.getName() === params.project);

		if (!currentProject.length) {
			console.log(
				`Projecto "${params.project} no encontrado en: ${params.dir}"`
			);
		}
		console.log('Buscando pipelines...');
		let affected = searchForDependencies(tree, params.project);

		if (affected.length) {
			affected.forEach((node) => {
				console.log(`Afectado: ${node.getName()}`);
			});

            let printNodes = String(await question("Quieres imprimir el arbol de dependencias? (y/n) ")).toLowerCase();


            if(printNodes === 'y' || printNodes === 'yes')
            {
                console.log("Imprimir");
                affected.forEach(node => node.printDependencies());
            }
		} else {
			console.log('No hay proyectos afectados por este commit');
		}
	}
	process.exit();
};
init();

const searchForDependencies = (repos: Tree[], givenProject: string): Tree[] => {
	let affected: Tree[] = [];
	repos.forEach((node) => {
		if (node.getName() !== givenProject && node.dependsOn(givenProject)) {
			affected.push(node);
		}
	});

	return affected;
};
