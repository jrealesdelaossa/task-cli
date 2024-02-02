const { program } = require("commander");
const { prompt } = require("inquirer");
const {
  addTask,
  listTasks,
  removeTask,
    updateTask,
    findTask,
} = require("./controllers/task.controller");

program.version("0.1.0").description("Una descripción de la aplicación");

const taskQuestions = [
  {
    type: "input",
    message: "Task title",
    name: "title",
  },
  {
    type: "input",
    message: "Task desctiption",
    name: "description",
  },
];
program
  .command("save")
  .alias("s")
  .action(async () => {
    const answers = await prompt(taskQuestions);

    addTask(answers);
  });

program.command("list").action(async () => {
  await listTasks();
});

program.command("delete <id>").action(async (_id) => {
  await removeTask(_id);
});

program.command("update <id>").alias("u").action(async (_id) => {
    const answers = await prompt(taskQuestions);
    await updateTask(_id, answers);
});

program.command("find <task>").alias("ft").action(async (text) => {
    await findTask(text);
});

program.parse(process.argv);
