module.exports = {
    multiProject: false, /* Enable searching projects with component folder path */
    skipFinalStep: false, /* Toggle final step agreement */
    folderPath: 'src/', /* Destination path or array of paths to create components */
    templatesFolder: 'templates', /* Folder which contains templates */
    templates: { /* Component file structure declaration */
        index: {
            name: 'index.js',
            file: 'index.js'
        },
        component: {
            name: '[name].jsx',
            file: [
                { name: 'fc.jsx', description: 'Functional component' },
                { name: 'class.jsx', description: 'Class component' },
            ],
        },
        style: {
            name: '[name].module.scss',
            optional: true
        },
        test: {
            name: '[name].test.jsx',
            optional: true,
            default: false
        },
    },
    placeholders: { /* Placeholders to fill data in templates, #NAME# for example */
        NAME: ({ componentName }) => componentName,
        STYLE: ({ files }) => (files.style ? `\nimport styles from './${files.style.name}';` : ''),
    },
    // afterCreation: {
    //     prettier: { /* Script name */
    //         extensions: ['.js', '.jsx'],
    //         cmd: 'prettier --write [filepath]' /* Script command */
    //     }
    // }
};
