// handle-commitlint-error.ts

import { execSync } from 'child_process';

try {
	// Run commitlint command
	const result = execSync('commitlint -E HUSKY_GIT_PARAMS', {
		encoding: 'utf-8',
	});

	console.log(result);
} catch (error) {
	// Handle error from commitlint
	if (error.stderr) {
		const errorMessage: string = error.stderr.toString();

		// Format error message
		if (errorMessage.includes('.commitlintrc.json is invalid')) {
			console.error(
				'Error: Commitlint configuration in .commitlintrc.json is invalid.'
			);
			console.error('Please check and correct the configuration.');
			console.error('Details:');
			console.error(errorMessage);
		} else {
			console.error('An error occurred during commit validation:');
			console.error(errorMessage);
		}

		process.exit(1); // Exit with failure code
	} else {
		console.error('An unexpected error occurred:');
		console.error(error);
		process.exit(1); // Exit with failure code
	}
}
