import {taskPageRepo} from "./schema/tasks/repos"

const test = async () => {
    console.log("\n-----------------Executing test-----------------\n")
    
    // const em = orm.em
    // const pageRepo = em.getRepository(TaskPage)
    console.log(taskPageRepo)
    // console.time()
    // const page = await pageRepo.findOne(2, ["taskGroups"]);
    // console.timeEnd()

    // console.log(page);
    // const group2 = new TaskGroup("Second Group", pages[0])
    // console.log(pages[0].taskGroups.remove(pages[0].taskGroups[0]))

    // console.log(pages[0].taskGroups.toArray())
    // await em.persistAndFlush(page)
    // await em.flush()
    // console.log(await em.find(TaskPage, {id: 2}, ["name",]))
}

export default test 