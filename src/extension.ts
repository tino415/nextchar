import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "nextchar" is now active!');

	const find = vscode.commands.registerCommand('nextchar.find', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const options = {
				prompt: "Character: ",
				placeHolder: "(character)"
			};
			
			vscode.window.showInputBox(options).then(character => {
				if (!character) { return; };

				const newSelections = editor.selections.map(selection => {
					const active = selection.active;
					const text = editor.document.lineAt(active.line).text.substring(active.character);
					const moveBy = text.indexOf(character);
	
					if (moveBy > -1) {
						const newActive = active.with(active.line, active.character + moveBy);
						return new vscode.Selection(newActive, newActive);
					} else {
						return selection;
					}
				});
	
				editor.selections = newSelections;
			});
		}
	});

	context.subscriptions.push(find);
}

export function deactivate() {}
